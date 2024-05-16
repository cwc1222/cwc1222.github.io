class SPARQLQueryDispatcher {
	#endpoint: string = 'https://query.wikidata.org/sparql';
    #headers = { Accept: 'application/sparql-results+json' };

	public async queryCountryInfo(wikiCountryId: string) {
		const sparqlQuery = `
        SELECT 
          ?continentLabel
          ?countryLabel 
          ?capitalLabel
          ?coordinates
          (year(?inception) AS ?inception_year)
          ?hdi
          ?population 
          ?life_expectancy
          (?gdp_usd / ?population AS ?gdp_per_capita_usd)
          (year(?gpd_date) AS ?gdp_year)
          (GROUP_CONCAT(DISTINCT ?timezoneLabel; separator = ", ") AS ?timezones)
          (GROUP_CONCAT(DISTINCT ?currencyCode; separator = ", ") AS ?currencies)
          (GROUP_CONCAT(DISTINCT ?official_lang_lables; separator = ", ") AS ?langs)
          (GROUP_CONCAT(DISTINCT ?voltage; separator = ", ") AS ?voltages)
          (GROUP_CONCAT(DISTINCT ?frequency; separator = ", ") AS ?frequencies)
          (GROUP_CONCAT(DISTINCT ?plugTypeLabel; separator = ", ") AS ?plugTypes)
        WHERE {
          ?country wdt:P31 wd:Q6256. # is instance of country
          ?country wdt:P17 wd:${wikiCountryId}. # country is Q733 Paraguay
        
          Optional {
            ?country wdt:P30 ?continent.
            ?continent rdfs:label ?continentLabel filter (lang(?continentLabel) = "en").
            ?country rdfs:label ?countryLabel filter (lang(?countryLabel) = "en").
            ?country wdt:P36 ?capital.
            ?capital rdfs:label ?capitalLabel filter (lang(?capitalLabel) = "en").

            ?country p:P421/ps:P421 ?timezone.
            ?timezone rdfs:label ?timezoneLabel filter (lang(?timezoneLabel) = "en").
            ?country wdt:P625 ?coordinates.
            ?country wdt:P571 ?inception.
            ?country wdt:P1081 ?hdi.
            ?country wdt:P1082 ?population.
            ?country wdt:P2250 ?life_expectancy.

            ?country wdt:P37 ?official_lang.
            #?official_lang wdt:P218 ?official_lang_code.
            ?official_lang rdfs:label ?official_lang_lables filter (lang(?official_lang_lables) = "en").

            # Currencies
            ?country wdt:P38 ?currency.
            ?currency wdt:P498 ?currencyCode.

            # Nominal GDP
            ?country wdt:P2131 ?gdp_usd.
            ?gdpStmt ps:P2131 ?gdp_usd ;
                     pq:P585 ?gpd_date .
            FILTER(?gpd_date = MAX(?gpd_date))
        
            # Domestic electricity and Plug type
            ?country p:P2884/ps:P2884 ?voltage. # i'm not sure about the divider operator
            ?country p:P2884 ?voltageStatement.
            ?voltageStatement pq:P2144 ?frequency.
            ?country wdt:P2853 ?plugType.
            ?plugType rdfs:label ?plugTypeLabel filter (lang(?plugTypeLabel) = "en").
          }
          SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
        }
        GROUP BY ?continentLabel ?countryLabel ?capitalLabel ?coordinates ?inception ?hdi ?population ?life_expectancy ?gdp_usd ?gpd_date

        `;
        const fullUrl = `${this.#endpoint}?query=${encodeURIComponent(sparqlQuery)}`;
        return fetch(fullUrl, { headers: this.#headers }).then((body) => body.json());
	}
}
