const check_double_star = (str)=>{
    return /^(\*)(\*)(.*)\*$/.test(str)
}

export function replace_stars(str){
    return str.replace(/^(\*)(\*)|(\*)$/g,'');
}

export default check_double_star;

