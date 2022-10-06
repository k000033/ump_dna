const getHubUrl = new URL(window.location.href);
let username = new URL(`https://1.com?${getHubUrl.href.split("?")[1]}`).searchParams.get("username");

export class useUmpDnaParams{
    constructor(){
      this.PAGE="";
      this.TAG ="";
      this.NAME ="";
      this.GENE="";
      this.IDX="";
      this.OBJECT="";
      this.HINT="";
      this.SQL="";
      this.QUERY_TYPE="";
      this.QUERY_DNA_TYPE="";
      this.FILETER="";
      this.USER_ID=`${username}`;
    }

    initialParams(){
        this.PAGE="";
        this.TAG ="";
        this.NAME ="";
        this.GENE="";
        this.IDX="";
        this.OBJECT="";
        this.HINT="";
        this.SQL="";
        this.QUERY_TYPE="";
        this.QUERY_DNA_TYPE="";
        this.FILETER="";
    }
}