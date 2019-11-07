module.exports = (mongoose) => {

const MovieSchema = new mongoose.Schema();

return mongoose.model("Movie", MovieSchema);

};