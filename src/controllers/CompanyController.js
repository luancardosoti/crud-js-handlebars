const { Op } = require('sequelize');
const Company = require('../models/Company');
const { getStatus } = require('../scripts.js')

module.exports = { 
  async index (req, res) {
    const {company_name, status, cnpj} = req.query;
    var companies;

    if(company_name && status && cnpj) {
      companies = await Company.findAll({
        where: {
          [Op.and]: [
            {company_name: {[Op.like]:  `%${company_name}%`}},
            {status: status},
            {cnpj: cnpj },
          ],         
        }
      })
    } else if(company_name && status) {
      companies = await Company.findAll({
        where: {
          [Op.and]: [
            {company_name: {[Op.like]:  `%${company_name}%`}},
            {status: status},
          ],         
        }
      })
    } if(company_name && cnpj) {
      companies = await Company.findAll({
        where: {
          [Op.and]: [
            {company_name: {[Op.like]:  `%${company_name}%`}},
            {cnpj: cnpj },
          ],         
        }
      })
    } if(status && cnpj) {
      companies = await Company.findAll({
        where: {
          status: status,
          cnpj: cnpj  
        }
      })
    } if(company_name) {
      companies = await Company.findAll({
        where: {    
          company_name: { [Op.like]:  `%${company_name}%`}
        }
      })
    } if(status) {
      companies = await Company.findAll({
        where: {
          status: status,
        }
      })
    } if(cnpj) {
      companies = await Company.findAll({
        where: {
          cnpj: {[Op.like]:  `${cnpj}%`}
        }
      })
    }
    
    if(!company_name && !status && !cnpj) {
      companies = await Company.findAll()
    }
    return res.render('home', {companies: companies})
  },

  async getCompany (req, res) {

    return res.render('create');
  },

  async setCompany (req, res) {
    const { cnpj, cpf, company_name, email, telefone, cep, uf, cidade, bairro, logradouro, numero } = req.body;

    const status = getStatus();

    const company = await Company.create({
      cnpj, cpf, company_name, status, telefone, email,
      cep, uf, cidade, bairro, logradouro, numero
    });

    return res.redirect('/');
  },

  async getUpdate (req, res) {
    const {id} = req.params;

    const company = await Company.findByPk(id);

    return res.render('update', {company: company})
  },

  async setUpdate (req, res) {
    const { id, company_name, email, telefone, cep, uf, cidade, bairro, logradouro, numero } = req.body;


    const query = await Company.update(
      {
        company_name: company_name,
        telefone: telefone,
        email: email,
        cep: cep,
        uf: uf,
        cidade: cidade, 
        bairro: bairro,
        logradouro: logradouro,
        numero: numero,
      },
      {where: {id: id}}
    )
    return res.redirect('/')
  },

  deleteCompany (req, res) {
    Company.destroy({where: {'id': req.params.id}}).then(function(){
      res.redirect('/')
    }).catch(function(err) {
      res.send('Erro ao deletar: '+err)
    })
  }
}  