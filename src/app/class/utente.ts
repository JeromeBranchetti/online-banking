
export class utente {
  id?: number;
  firstName!: string;
  lastName!: string;
  birthDate!: string;
  email!: string;
  password!: string;
  dipendente!: boolean;

  constructor(
    name: string,
    last_name: string,
    date: string,
    email: string,
    password: string,
    dipendente:boolean
  ) {
    this.firstName = name;
    this.birthDate = date;
    this.lastName = last_name;
    this.email = email;
    this.password = password;
    this.dipendente = dipendente
  }
  getId() {}
  static factory() {
    let u = new utente('', '', '', '', '',false);
    return u;
  }
  controlloDipendente(): boolean {
    return false;
  }

}
