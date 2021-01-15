const {Model, DataTypes} = require('sequelize');

class Company extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      cnpj: DataTypes.STRING,
      cpf: DataTypes.STRING,
      company_name: DataTypes.STRING,
      status: DataTypes.STRING,
      telefone: DataTypes.STRING,
      email: DataTypes.STRING,
      //address
      cep: DataTypes.STRING,
      uf: DataTypes.STRING,
      cidade: DataTypes.STRING,
      bairro: DataTypes.STRING,
      logradouro: DataTypes.STRING,
      numero: DataTypes.INTEGER,
    }, {
      sequelize
    })  
  }
}

module.exports = Company;