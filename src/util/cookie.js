class Cookie{
  setCookie(name, value, iTime){
    var iDate = new Date();
    iDate.setDate(iDate.getSeconds() + iTime); 
    document.cookie = name + '=' + value + ';expires=' + iDate.toGMTString();
  }
  getCookie(name) {
    //web中cookie是以分号+空格隔开的
    var res = document.cookie.split('; ');
    for (let i = 0; i < res.length; i++)
        if (res[i].split('=')[0] === name) return res[i].split('=')[1];
        //未找到
    return '';
  }
  rmCookie(name) {
    this.setCookie(name, "",-1);
  }
  clearAllCookie() {  
    var keys = document.cookie.match(new RegExp(/[^ =;]+(?=)/g));  
    if(keys) {  
      for(var i = keys.length; i--;)  
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()  
    }  
  }  
}

export default new Cookie() 
