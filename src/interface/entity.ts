export interface Space {
    space_id: string;
    space_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface Sport {
    sport_id: string;
    sport_name: string;
    sport_min_team_members: number;
    sport_max_team_members: number;
    created_at: Date;
    updated_at: Date;
}

export interface Team {
    team_id: string;
    team_space_id: string;
    team_sport_id: string;
    team_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface Player {
    player_id: string;
    player_name: string;
    player_team_id: string;
    player_sport_id: string;
    created_at: Date;
    updated_at: Date;
}

export interface GameType {
    game_type_id: string;
    game_type_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface GameHistory {
    game_id: string;
    game_space_id: string;
    game_sport_id: string;
    game_team_a_id: string;
    game_team_b_id: string;
    game_game_type_id: string;
    game_winner_team_id: string;
    game_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface Match {
    match_id: string;
    match_game_id: string;
    match_team_a_id: string;
    match_team_b_id: string;
    match_team_a_score: number;
    match_team_b_score: number;
    match_date: Date;
    created_at: Date;
    updated_at: Date;
}

export interface Standing {
    standings_team_id: string;
    standings_sport_id: string;
    standings_matches_played: number;
    standings_wins: number;
    standings_losses: number;
    standings_points: number;
    created_at: Date;
    updated_at: Date;
}
