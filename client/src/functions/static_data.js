export const getTypeName = (value) => {
  //MODO 1

  // let name_type = '';

  // if(value ===1){
  //     name_type = "Administrador"
  // }else if(value===2){
  //     name_type = "Gerente"
  // }else{
  //     name_type = "Funcionário"
  // }
  // return name_type

  //MODO 2
  //   if (value === 1) {
  //     return "Administrador";
  //   } else if (value === 2) {
  //     return "Gerente";
  //   } else if (value === 3) {
  //     return "Funcionário";
  //   }
  //   return "";

  //MODO 3

  var arrTypeUser = ["Administrador", "Gerente", "Funcionário"];
  return arrTypeUser[value-1];
};
