import { QueryConfig } from "pg"


export const reset_visited_countries = (): {text: string} => {
    return {
        text: "DELETE FROM visited_countries"
    }
}

export const check_in_visted_countries_query = (country: string): QueryConfig<(string | number)[]> => {
    return {
        text: `SELECT * FROM visited_countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';`,
        values: [country.toLowerCase()]
    }
}

export const insert_into_visited_countries = (country_name: string, country_code: string, id: number): QueryConfig<(string | number)[]> => {
    return {
        text: "INSERT INTO visited_countries(id, country_name, country_code) VALUES($1, $2, $3);",
        values: [id.toString(), country_name, country_code]
    }
}

export const find_country_query = (country: string): QueryConfig<(string | number)[]> => {
    return {
        text: `SELECT * FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%'`,
        values: [country]
    }
}

export const get_all_visited_countries_query = (): { text: string } => {
    return {
        text: "SELECT country_code, country_name FROM visited_countries"
    }
}

