interface UserProviderProps {
  children: React.ReactNode;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  full_name: string;
  email: string;
  phone: string;
  image?: string;
  password: string;
}

interface AuthContextValues {
  signIn: (data: LoginData) => void;
  loading: boolean;
  registerClient: (data: RegisterData) => void;
}

interface ClientProviderProps {
  children: React.ReactNode;
}

interface ClientProviderProps {
  children: React.ReactNode;
}

interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  image: string;
  created_at: string | Date;
  contacts: Contact[];
}

interface Contact {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  image: string;
  created_at: string | Date;
  client_id: string;
}
