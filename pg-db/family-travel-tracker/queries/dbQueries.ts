import { QueryConfig } from "pg"


export const reset_visited_countries = (userId: number): QueryConfig<(string | number)[]> => {
    return {
        text: "DELETE FROM visited_countries WHERE user_id = $1",
        values: [userId]
    }
}

export const check_in_visted_countries_query = (countryId: number, userId: number): QueryConfig<(string | number)[]> => {
    return {
        text: `SELECT * FROM visited_countries WHERE country_id = $1 AND user_id = $2 ;`,
        values: [+countryId, +userId]
    }
}

export const insert_into_visited_countries = (countryId: number, countryCode: string, userId: number): QueryConfig<(number | string)[]> => {
    console.log(countryId, countryCode, userId);
    return {
        text: "INSERT INTO visited_countries(country_code, country_id, user_id) VALUES($1, $2, $3);",
        values: [countryCode, countryId.toString(), userId.toString()]
    }
}

export const find_country_query = (country: string): QueryConfig<(string | number)[]> => {
    return {
        text: `SELECT * FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%' ORDER BY LENGTH(country_name)`,
        values: [country.toLowerCase()]
    }
}

export const get_all_visited_countries_query = (userId: number): QueryConfig<(string | number)[]> => {
    return {
        text: "SELECT * FROM visited_countries WHERE user_id = $1;",
        values: [userId]
    }
}

export const get_all_users_query = (): { text: string } => {
    return {
        text: "SELECT * FROM users;"
    }
}

export const get_an_user_query = (id: number): QueryConfig<(string | number)[]> => {
    return {
        text: "SELECT * FROM users WHERE id = $1 ;",
        values: [id]
    }
}


export const find_user_query = (userName: string): QueryConfig<(string | number)[]> => {
    return {
        text: `SELECT * FROM users WHERE name = $1 ;`,
        values: [userName],
    }
}

export const add_new_user_query = (userName: string, color: string): QueryConfig<(string | number)[]> => {
    return {
        text: `INSERT INTO users(name, color) VALUES($1, $2);`,
        values: [userName, color],
    }
}
