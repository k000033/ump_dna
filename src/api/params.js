const getHubUrl = new URL(window.location.href);
let username = new URL(`https://1.com?${getHubUrl.href.split("?")[1]}`).searchParams.get("username");

export class useUmpDnaParams{
    constructor(){
      this.TAG ="";
      this.OBJECT="";
      this.OBJECT_TYPE="";
      this.QUERY_MODE="";
      this.FILETER="";
      this.CHECK_TYPE=""
      this.USER_ID=`${username}`;
    }

    initialParams(){
      this.TAG ="";
      this.OBJECT="";
      this.OBJECT_TYPE="";
      this.QUERY_MODE="";
      this.FILETER="";
      this.CHECK_TYPE=""
    }
}