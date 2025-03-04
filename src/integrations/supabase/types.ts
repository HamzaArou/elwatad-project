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
      favorites: {
        Row: {
          created_at: string
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          attempt_time: string | null
          email: string
          id: string
          ip_address: string | null
        }
        Insert: {
          attempt_time?: string | null
          email: string
          id?: string
          ip_address?: string | null
        }
        Update: {
          attempt_time?: string | null
          email?: string
          id?: string
          ip_address?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          name?: string | null
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_details: {
        Row: {
          created_at: string
          details: string | null
          features_description: string | null
          id: string
          lat: number | null
          lng: number | null
          postal_code: string | null
          project_id: string
          status: string
        }
        Insert: {
          created_at?: string
          details?: string | null
          features_description?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          postal_code?: string | null
          project_id: string
          status?: string
        }
        Update: {
          created_at?: string
          details?: string | null
          features_description?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          postal_code?: string | null
          project_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_features: {
        Row: {
          amount: number
          created_at: string
          feature_type: Database["public"]["Enums"]["project_feature_type"]
          id: string
          project_id: string
        }
        Insert: {
          amount?: number
          created_at?: string
          feature_type: Database["public"]["Enums"]["project_feature_type"]
          id?: string
          project_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          feature_type?: Database["public"]["Enums"]["project_feature_type"]
          id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_features_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_media: {
        Row: {
          created_at: string
          display_order: number
          id: string
          media_type: string
          media_url: string
          project_id: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          media_type: string
          media_url: string
          project_id: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          media_type?: string
          media_url?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_units: {
        Row: {
          area: number
          bathrooms: number
          created_at: string
          details: Json | null
          floor_number: number
          id: string
          name: string
          project_id: string | null
          rooms: number
          side: string
          status: string
          unit_number: number
          unit_type: string
        }
        Insert: {
          area: number
          bathrooms?: number
          created_at?: string
          details?: Json | null
          floor_number: number
          id?: string
          name: string
          project_id?: string | null
          rooms?: number
          side: string
          status?: string
          unit_number: number
          unit_type: string
        }
        Update: {
          area?: number
          bathrooms?: number
          created_at?: string
          details?: Json | null
          floor_number?: number
          id?: string
          name?: string
          project_id?: string | null
          rooms?: number
          side?: string
          status?: string
          unit_number?: number
          unit_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_units_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          area: number
          bathrooms: number
          city: Database["public"]["Enums"]["city_type"]
          created_at: string
          details: string | null
          district: string
          features: string[] | null
          gallery: Json[] | null
          id: string
          lat: number | null
          lng: number | null
          location: string | null
          name: string
          property_status: Database["public"]["Enums"]["property_status"]
          property_value: number
          rooms: number
          thumbnail_url: string
        }
        Insert: {
          area: number
          bathrooms?: number
          city?: Database["public"]["Enums"]["city_type"]
          created_at?: string
          details?: string | null
          district: string
          features?: string[] | null
          gallery?: Json[] | null
          id?: string
          lat?: number | null
          lng?: number | null
          location?: string | null
          name: string
          property_status: Database["public"]["Enums"]["property_status"]
          property_value: number
          rooms?: number
          thumbnail_url: string
        }
        Update: {
          area?: number
          bathrooms?: number
          city?: Database["public"]["Enums"]["city_type"]
          created_at?: string
          details?: string | null
          district?: string
          features?: string[] | null
          gallery?: Json[] | null
          id?: string
          lat?: number | null
          lng?: number | null
          location?: string | null
          name?: string
          property_status?: Database["public"]["Enums"]["property_status"]
          property_value?: number
          rooms?: number
          thumbnail_url?: string
        }
        Relationships: []
      }
      property_requests: {
        Row: {
          city: string
          created_at: string
          id: string
          name: string
          phone: string
          property_type: string
        }
        Insert: {
          city: string
          created_at?: string
          id?: string
          name: string
          phone: string
          property_type: string
        }
        Update: {
          city?: string
          created_at?: string
          id?: string
          name?: string
          phone?: string
          property_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      city_type: "مدينة مكة" | "مدينة جدة"
      media_type: "image" | "video"
      project_feature_type:
        | "غرفة خادمة"
        | "بها مصعد"
        | "بدون مسبح"
        | "بدون جراج"
        | "موقف خاص"
        | "غرفة سائق"
        | "غير مفروشة"
        | "مطبخ مجهز"
        | "تكييف مركزي"
        | "خزان مياه"
      property_status: "فيلا" | "شقة" | "روف" | "أرض"
      property_type: "فيلا" | "شقة" | "روف" | "أرض"
    }
    CompositeTypes: {
      gallery_item: {
        id: string | null
        url: string | null
        type: Database["public"]["Enums"]["media_type"] | null
        content_type: string | null
        created_at: string | null
      }
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
