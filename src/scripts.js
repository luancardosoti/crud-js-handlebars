module.exports = {
  getStatus() {
    var num = Math.floor(Math.random() * 2);  
    var status = (num === 1) ? 'ativo' : 'inativo'
    
    return status
  }
}