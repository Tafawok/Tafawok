export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      client_partners: {
        Row: {
          category: string
          country: string
          created_at: string
          id: string
          name: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          category: string
          country: string
          created_at?: string
          id: string
          name: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category?: string
          country?: string
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      commercial_disciplines: {
        Row: {
          created_at: string
          description: NonNullable<Json>
          features: NonNullable<Json>
          icon_name: string
          id: string
          key_metric: NonNullable<Json>
          sort_order: number
          tagline: NonNullable<Json>
          title: NonNullable<Json>
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: NonNullable<Json>
          features?: NonNullable<Json>
          icon_name: string
          id: string
          key_metric: NonNullable<Json>
          sort_order?: number
          tagline: NonNullable<Json>
          title: NonNullable<Json>
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: NonNullable<Json>
          features?: NonNullable<Json>
          icon_name?: string
          id?: string
          key_metric?: NonNullable<Json>
          sort_order?: number
          tagline?: NonNullable<Json>
          title?: NonNullable<Json>
          updated_at?: string
        }
        Relationships: []
      }
      corporate_metrics: {
        Row: {
          created_at: string
          description: NonNullable<Json>
          id: string
          label: NonNullable<Json>
          sort_order: number
          suffix: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          description: NonNullable<Json>
          id: string
          label: NonNullable<Json>
          sort_order?: number
          suffix?: string
          updated_at?: string
          value: number
        }
        Update: {
          created_at?: string
          description?: NonNullable<Json>
          id?: string
          label?: NonNullable<Json>
          sort_order?: number
          suffix?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      corporate_values: {
        Row: {
          created_at: string
          description: NonNullable<Json>
          icon_name: string
          id: string
          number: string
          sort_order: number
          tagline: NonNullable<Json>
          title: NonNullable<Json>
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: NonNullable<Json>
          icon_name: string
          id: string
          number: string
          sort_order?: number
          tagline: NonNullable<Json>
          title: NonNullable<Json>
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: NonNullable<Json>
          icon_name?: string
          id?: string
          number?: string
          sort_order?: number
          tagline?: NonNullable<Json>
          title?: NonNullable<Json>
          updated_at?: string
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          interest_type: string | null
          message: string
          name: string
          phone: string | null
          property_slug: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          interest_type?: string | null
          message: string
          name: string
          phone?: string | null
          property_slug?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          interest_type?: string | null
          message?: string
          name?: string
          phone?: string | null
          property_slug?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      investment_pillars: {
        Row: {
          created_at: string
          description: NonNullable<Json>
          id: string
          metric: NonNullable<Json>
          number: string
          sort_order: number
          tagline: NonNullable<Json>
          title: NonNullable<Json>
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: NonNullable<Json>
          id: string
          metric: NonNullable<Json>
          number: string
          sort_order?: number
          tagline: NonNullable<Json>
          title: NonNullable<Json>
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: NonNullable<Json>
          id?: string
          metric?: NonNullable<Json>
          number?: string
          sort_order?: number
          tagline?: NonNullable<Json>
          title?: NonNullable<Json>
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: NonNullable<Json>
          category: NonNullable<Json>
          contact: NonNullable<Json>
          created_at: string
          description: NonNullable<Json>
          full_overview: NonNullable<Json>
          gallery: NonNullable<Json>
          highlights: NonNullable<Json>
          id: string
          is_published: boolean
          key_stats: NonNullable<Json>
          location: NonNullable<Json>
          main_image: string
          name: NonNullable<Json>
          slug: string
          sort_order: number
          specs: NonNullable<Json>
          status: string
          tagline: NonNullable<Json>
          type: string
          updated_at: string
          video: Json | null
        }
        Insert: {
          amenities?: NonNullable<Json>
          category: NonNullable<Json>
          contact: NonNullable<Json>
          created_at?: string
          description: NonNullable<Json>
          full_overview: NonNullable<Json>
          gallery?: NonNullable<Json>
          highlights?: NonNullable<Json>
          id: string
          is_published?: boolean
          key_stats: NonNullable<Json>
          location: NonNullable<Json>
          main_image: string
          name: NonNullable<Json>
          slug: string
          sort_order?: number
          specs?: NonNullable<Json>
          status?: string
          tagline: NonNullable<Json>
          type?: string
          updated_at?: string
          video?: Json | null
        }
        Update: {
          amenities?: NonNullable<Json>
          category?: NonNullable<Json>
          contact?: NonNullable<Json>
          created_at?: string
          description?: NonNullable<Json>
          full_overview?: NonNullable<Json>
          gallery?: NonNullable<Json>
          highlights?: NonNullable<Json>
          id?: string
          is_published?: boolean
          key_stats?: NonNullable<Json>
          location?: NonNullable<Json>
          main_image?: string
          name?: NonNullable<Json>
          slug?: string
          sort_order?: number
          specs?: NonNullable<Json>
          status?: string
          tagline?: NonNullable<Json>
          type?: string
          updated_at?: string
          video?: Json | null
        }
        Relationships: []
      }
      property_stores: {
        Row: {
          category: NonNullable<Json>
          created_at: string
          description: Json | null
          floor: NonNullable<Json>
          id: string
          name: NonNullable<Json>
          phone: string | null
          property_id: string
          sort_order: number
          status: string
          unit_number: string | null
          updated_at: string
        }
        Insert: {
          category: NonNullable<Json>
          created_at?: string
          description?: Json | null
          floor: NonNullable<Json>
          id: string
          name: NonNullable<Json>
          phone?: string | null
          property_id: string
          sort_order?: number
          status?: string
          unit_number?: string | null
          updated_at?: string
        }
        Update: {
          category?: NonNullable<Json>
          created_at?: string
          description?: Json | null
          floor?: NonNullable<Json>
          id?: string
          name?: NonNullable<Json>
          phone?: string | null
          property_id?: string
          sort_order?: number
          status?: string
          unit_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_stores_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          data: NonNullable<Json>
          key: string
          updated_at: string
        }
        Insert: {
          data: NonNullable<Json>
          key: string
          updated_at?: string
        }
        Update: {
          data?: NonNullable<Json>
          key?: string
          updated_at?: string
        }
        Relationships: []
      }
      timeline_milestones: {
        Row: {
          badge: NonNullable<Json>
          created_at: string
          description: NonNullable<Json>
          highlights: NonNullable<Json>
          id: string
          scope_category: string
          sort_order: number
          title: NonNullable<Json>
          updated_at: string
          year: string
        }
        Insert: {
          badge: NonNullable<Json>
          created_at?: string
          description: NonNullable<Json>
          highlights?: NonNullable<Json>
          id: string
          scope_category?: string
          sort_order?: number
          title: NonNullable<Json>
          updated_at?: string
          year: string
        }
        Update: {
          badge?: NonNullable<Json>
          created_at?: string
          description?: NonNullable<Json>
          highlights?: NonNullable<Json>
          id?: string
          scope_category?: string
          sort_order?: number
          title?: NonNullable<Json>
          updated_at?: string
          year?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: { Args: Record<PropertyKey, never>; Returns: boolean }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
