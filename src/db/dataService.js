class DataService {
    constructor(model) {
      this.model = model;
    }
  
   
    
  
    async getAll() {
      try {
        const instances = await this.model.findAll({
          include,
          order
        });
        return instances;
      } catch (error) {
        console.error('Error al obtener:', error);
        throw error;
      }
    }
  
      
}
  
  module.exports = DataService;