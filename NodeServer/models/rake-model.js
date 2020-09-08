const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EquilibratedBasisDetails = new Schema (
  {
    equilibrated_moisture: { type: Number, required: true },
    ash: { type: Number, required: true },
    vm: { type: Number, required: true },
    gcv_cimfer: { type: Number, required: true },
    gcv_npgc: { type: Number, required: true },
  }
)

const TotalMoistureBasisDetails = new Schema (
  {
    total_moisture: { type: Number, required: true },
    ash: { type: Number, required: true },
    vm: { type: Number, required: true },
    gcv: { type: Number, required: true },
  }
)

const UnloadingEndDetails = new Schema (
  {
    equilibrated_basis: { type: EquilibratedBasisDetails, required: true},
    total_moisture_basis: { type: TotalMoistureBasisDetails, required: true},
    could_be_disputed: {type: Boolean, required: true },
    disputed_lab: { type: String },
  }
)

const LoadingEndDetails = new Schema (
  {
    equilibrated_moisture: { type: Number, required: true },
    total_moisture: { type: Number, required: true },
    ash: { type: Number, required: true },
    vm: { type: Number, required: true },
    gcv_cimfer: { type: Number, required: true },
    gcv_npgc: { type: Number, required: true },
    could_be_disputed: {type: Boolean, required: true },
    disputed_lab: { type: String },
    disputed_by_cimfer: { type: String },
  }
)

const Sample = new Schema (
  {
    id: { type: Number, required: true },
    billed_grade: { type: String, required: true },
    total_quantity: { type: Number },
    loading_end: { type: LoadingEndDetails, required: true },
    unloading_end: { type: UnloadingEndDetails, required: true },
  }
)

const Rake = new Schema(
    {
        employee_id: { type: [Number] },
        employee_name: { type: [String], required: true },
        source: { type: String, required: true },
        mines: { type: String, required: true },
        rr_no: { type: Number, required: true, unique: true },
        rake_loading_date: { type: Date, required: true },
        rake_unloading_date: { type: Date, required: true },
        sample_collection_date: { type: Date, required: true },
        rake_no: { type: Number, required: true, unique: true },
        is_disputed: {type: Boolean, required: true },
        samples: { type: [Sample], required: true },
    },
    { timestamps: true },
)

module.exports = mongoose.model('rakes', Rake, 'Rake_Analysis_Collection')
