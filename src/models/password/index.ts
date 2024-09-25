export interface IPassword {
  id?: string;
  site: string;        // El sitio web o servicio al que pertenece la contraseña
  username: string;    // El nombre de usuario o correo asociado al sitio
  password: string;    // La contraseña para el sitio (encriptada)
  note?: string;       // Una nota opcional para información adicional
}
