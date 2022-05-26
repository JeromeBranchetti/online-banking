export class dipendente{
    id!:number;
    name!:string;
    last_name!:string;
    email:string;
    password:string;
    constructor(id:number,name:string,last_name:string,email:string,password:string){
        this.id=id;
        this.name=name;
        this.last_name=last_name;
        this.email=email;
        this.password=password;

    }

}