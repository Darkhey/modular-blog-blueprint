export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      games: {
        Row: {
          blue_fleet: Json | null
          blue_ships: number[]
          created_at: string | null
          current_round: number
          game_state: string
          hit_positions: number[]
          id: string
          red_fleet: Json | null
          red_ships: number[]
          round_start_time: string
          updated_at: string | null
          winner: string | null
        }
        Insert: {
          blue_fleet?: Json | null
          blue_ships?: number[]
          created_at?: string | null
          current_round?: number
          game_state?: string
          hit_positions?: number[]
          id?: string
          red_fleet?: Json | null
          red_ships?: number[]
          round_start_time?: string
          updated_at?: string | null
          winner?: string | null
        }
        Update: {
          blue_fleet?: Json | null
          blue_ships?: number[]
          created_at?: string | null
          current_round?: number
          game_state?: string
          hit_positions?: number[]
          id?: string
          red_fleet?: Json | null
          red_ships?: number[]
          round_start_time?: string
          updated_at?: string | null
          winner?: string | null
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          id: string
          mvp_count: number
          player_id: string
          score: number
          updated_at: string | null
          wins: number
        }
        Insert: {
          id?: string
          mvp_count?: number
          player_id: string
          score?: number
          updated_at?: string | null
          wins?: number
        }
        Update: {
          id?: string
          mvp_count?: number
          player_id?: string
          score?: number
          updated_at?: string | null
          wins?: number
        }
        Relationships: [
          {
            foreignKeyName: "leaderboard_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          created_at: string | null
          emoji: string
          game_id: string
          id: string
          team: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          emoji: string
          game_id: string
          id?: string
          team?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          emoji?: string
          game_id?: string
          id?: string
          team?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      player_sessions: {
        Row: {
          created_at: string | null
          id: string
          is_online: boolean
          last_seen: string
          player_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_online?: boolean
          last_seen?: string
          player_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_online?: boolean
          last_seen?: string
          player_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "player_sessions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: true
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          id: string
          is_admin: boolean
          name: string | null
          team: string
          updated_at: string | null
          wallet: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          id?: string
          is_admin?: boolean
          name?: string | null
          team: string
          updated_at?: string | null
          wallet: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          id?: string
          is_admin?: boolean
          name?: string | null
          team?: string
          updated_at?: string | null
          wallet?: string
        }
        Relationships: []
      }
      round_results: {
        Row: {
          blue_hit: boolean
          blue_ships_remaining: number
          blue_target_position: number | null
          blue_total_votes: number
          created_at: string | null
          game_id: string
          id: string
          red_hit: boolean
          red_ships_remaining: number
          red_target_position: number | null
          red_total_votes: number
          round_number: number
        }
        Insert: {
          blue_hit?: boolean
          blue_ships_remaining?: number
          blue_target_position?: number | null
          blue_total_votes?: number
          created_at?: string | null
          game_id: string
          id?: string
          red_hit?: boolean
          red_ships_remaining?: number
          red_target_position?: number | null
          red_total_votes?: number
          round_number: number
        }
        Update: {
          blue_hit?: boolean
          blue_ships_remaining?: number
          blue_target_position?: number | null
          blue_total_votes?: number
          created_at?: string | null
          game_id?: string
          id?: string
          red_hit?: boolean
          red_ships_remaining?: number
          red_target_position?: number | null
          red_total_votes?: number
          round_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "round_results_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      votes: {
        Row: {
          boost_tokens: number
          created_at: string | null
          game_id: string
          id: string
          position: number
          round_number: number
          team: string
          user_id: string
        }
        Insert: {
          boost_tokens?: number
          created_at?: string | null
          game_id: string
          id?: string
          position: number
          round_number: number
          team: string
          user_id: string
        }
        Update: {
          boost_tokens?: number
          created_at?: string | null
          game_id?: string
          id?: string
          position?: number
          round_number?: number
          team?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "votes_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      voting_sessions: {
        Row: {
          boost_tokens: number
          created_at: string | null
          game_id: string
          id: string
          player_id: string
          position: number
          round_number: number
          team: string
          updated_at: string | null
        }
        Insert: {
          boost_tokens?: number
          created_at?: string | null
          game_id: string
          id?: string
          player_id: string
          position: number
          round_number: number
          team: string
          updated_at?: string | null
        }
        Update: {
          boost_tokens?: number
          created_at?: string | null
          game_id?: string
          id?: string
          player_id?: string
          position?: number
          round_number?: number
          team?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "voting_sessions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "voting_sessions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_old_voting_sessions: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      get_online_player_counts: {
        Args: Record<PropertyKey, never>
        Returns: {
          team: string
          count: number
        }[]
      }
      get_player_vote: {
        Args: { p_game_id: string; p_round_number: number; p_player_id: string }
        Returns: Json
      }
      get_round_status: {
        Args: { p_game_id: string }
        Returns: Json
      }
      get_round_vote_counts: {
        Args: { p_game_id: string; p_round_number: number }
        Returns: Json
      }
      mark_player_offline: {
        Args: { p_player_id: string }
        Returns: undefined
      }
      submit_vote: {
        Args: {
          p_game_id: string
          p_round_number: number
          p_player_id: string
          p_position: number
          p_team: string
          p_boost_tokens?: number
        }
        Returns: Json
      }
      update_leaderboard_stats: {
        Args: {
          p_player_id: string
          p_score_increase: number
          p_win_increase?: number
        }
        Returns: undefined
      }
      update_player_online_status: {
        Args: { p_player_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
