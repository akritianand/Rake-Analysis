const ServerToClient = (rake) => {
  var temp = []

  for (r of rake) {
    var tempS = []
    for (s of r.samples) {
      tempS.push({
        id: s.id,
        billed_grade: s.billed_grade,
        total_quantity: s.total_quantity,
        loading_end_ash: s.loading_end.ash,
        loading_end_vm: s.loading_end.vm,
        loading_end_gcv_cimfer: s.loading_end.gcv_cimfer,
        loading_end_gcv_npgc: s.loading_end.gcv_npgc,
        loading_end_equilibrated_moisture: s.loading_end.equilibrated_moisture,
        loading_end_total_moisture: s.loading_end.total_moisture,
        loading_end_could_be_disputed: s.loading_end.could_be_disputed,
        loading_end_disputed_lab: s.loading_end.disputed_lab,
        loading_end_disputed_by_cimfer: s.loading_end.disputed_by_cimfer,
        unloading_end_equilibrated_basis_equilibrated_moisture: s.unloading_end.equilibrated_basis.equilibrated_moisture,
        unloading_end_equilibrated_basis_vm: s.unloading_end.equilibrated_basis.vm,
        unloading_end_equilibrated_basis_ash: s.unloading_end.equilibrated_basis.ash,
        unloading_end_equilibrated_basis_gcv_cimfer: s.unloading_end.equilibrated_basis.gcv_cimfer,
        unloading_end_equilibrated_basis_gcv_npgc: s.unloading_end.equilibrated_basis.gcv_npgc,
        unloading_end_total_moisture_basis_total_moisture: s.unloading_end.total_moisture_basis.total_moisture,
        unloading_end_total_moisture_basis_ash: s.unloading_end.total_moisture_basis.ash,
        unloading_end_total_moisture_basis_vm: s.unloading_end.total_moisture_basis.vm,
        unloading_end_total_moisture_basis_gcv: s.unloading_end.total_moisture_basis.gcv,
        unloading_end_could_be_disputed: s.unloading_end.could_be_disputed,
        unloading_end_disputed_lab: s.unloading_end.disputed_lab,
      })
    }

    temp.push({
      employee_id: r.employee_id,
      employee_name: r.employee_name,
      source: r.source,
      mines: r.mines,
      rr_no: r.rr_no,
      rake_loading_date: r.rake_loading_date,
      rake_unloading_date: r.rake_unloading_date,
      sample_collection_date: r.sample_collection_date,
      rake_no: r.rake_no,
      is_disputed: r.is_disputed,
      samples: tempS,
    })
  }

  return (temp)
}

const ClientToServer = (body) => {
  var tempS = []
  for (s of body.samples) {
    tempS.push({
      id: s.id,
      billed_grade: s.billed_grade,
      total_quantity: s.total_quantity,
      loading_end: {
        ash: s.loading_end_ash,
        vm: s.loading_end_vm,
        gcv_cimfer: s.loading_end_gcv_cimfer,
        gcv_npgc: s.loading_end_gcv_npgc,
        equilibrated_moisture: s.loading_end_equilibrated_moisture,
        total_moisture: s.loading_end_total_moisture,
        could_be_disputed: s.loading_end_could_be_disputed,
        disputed_lab: s.loading_end_disputed_lab,
        disputed_by_cimfer: s.loading_end_disputed_by_cimfer,
      },
      unloading_end: {
        equilibrated_basis: {
          equilibrated_moisture: s.unloading_end_equilibrated_basis_equilibrated_moisture,
          ash: s.unloading_end_equilibrated_basis_ash,
          vm: s.unloading_end_equilibrated_basis_vm,
          gcv_cimfer: s.unloading_end_equilibrated_basis_gcv_cimfer,
          gcv_npgc: s.unloading_end_equilibrated_basis_gcv_npgc,
        },
        total_moisture_basis: {
          total_moisture: s.unloading_end_total_moisture_basis_total_moisture,
          ash: s.unloading_end_total_moisture_basis_ash,
          vm: s.unloading_end_total_moisture_basis_vm,
          gcv: s.unloading_end_total_moisture_basis_gcv,
        },
        could_be_disputed: s.unloading_end_could_be_disputed,
        disputed_lab: s.unloading_end_disputed_lab,
      }
    })
  }

  return ({
    employee_id: body.employee_id,
    employee_name: body.employee_name,
    source: body.source,
    mines: body.mines,
    rr_no: body.rr_no,
    rake_loading_date: body.rake_loading_date,
    rake_unloading_date: body.rake_unloading_date,
    sample_collection_date: body.sample_collection_date,
    rake_no: body.rake_no,
    is_disputed: body.is_disputed,
    samples: tempS,
  })
}

const UpdateClientToServer = (dbRes, updatedRes) => {
  dbRes.employee_id = updatedRes.employee_id
  dbRes.employee_name = updatedRes.employee_name
  dbRes.source = updatedRes.source
  dbRes.mines = updatedRes.mines
  dbRes.rr_no = updatedRes.rr_no
  dbRes.rake_loading_date = updatedRes.rake_loading_date
  dbRes.rake_unloading_date = updatedRes.rake_unloading_date
  dbRes.sample_collection_date = updatedRes.sample_collection_date
  dbRes.rake_no = updatedRes.rake_no
  dbRes.is_disputed = updatedRes.is_disputed

  for (var i=0; i<dbRes.samples.length; i++) {
    dbRes.samples[i].billed_grade = updatedRes.samples[i].billed_grade
    dbRes.samples[i].total_quantity = updatedRes.samples[i].total_quantity
    dbRes.samples[i].loading_end.ash = updatedRes.samples[i].loading_end_ash
    dbRes.samples[i].loading_end.vm = updatedRes.samples[i].loading_end_vm
    dbRes.samples[i].loading_end.gcv_cimfer = updatedRes.samples[i].loading_end_gcv_cimfer
    dbRes.samples[i].loading_end.gcv_npgc = updatedRes.samples[i].loading_end_gcv_npgc
    dbRes.samples[i].loading_end.equilibrated_moisture = updatedRes.samples[i].loading_end_equilibrated_moisture
    dbRes.samples[i].loading_end.total_moisture = updatedRes.samples[i].loading_end_total_moisture
    dbRes.samples[i].loading_end.could_be_disputed = updatedRes.samples[i].loading_end_could_be_disputed
    dbRes.samples[i].loading_end.disputed_lab = updatedRes.samples[i].loading_end_disputed_lab
    dbRes.samples[i].loading_end.disputed_by_cimfer = updatedRes.samples[i].loading_end_disputed_by_cimfer
    dbRes.samples[i].unloading_end.equilibrated_basis.equilibrated_moisture = updatedRes.samples[i].unloading_end_equilibrated_basis_equilibrated_moisture
    dbRes.samples[i].unloading_end.equilibrated_basis.ash = updatedRes.samples[i].unloading_end_equilibrated_basis_ash
    dbRes.samples[i].unloading_end.equilibrated_basis.vm = updatedRes.samples[i].unloading_end_equilibrated_basis_vm
    dbRes.samples[i].unloading_end.equilibrated_basis.gcv_cimfer = updatedRes.samples[i].unloading_end_equilibrated_basis_gcv_cimfer
    dbRes.samples[i].unloading_end.equilibrated_basis.gcv_npgc = updatedRes.samples[i].unloading_end_equilibrated_basis_gcv_npgc
    dbRes.samples[i].unloading_end.total_moisture_basis.total_moisture = updatedRes.samples[i].unloading_end_total_moisture_basis_total_moisture
    dbRes.samples[i].unloading_end.total_moisture_basis.ash = updatedRes.samples[i].unloading_end_total_moisture_basis_ash
    dbRes.samples[i].unloading_end.total_moisture_basis.vm = updatedRes.samples[i].unloading_end_total_moisture_basis_vm
    dbRes.samples[i].unloading_end.total_moisture_basis.gcv = updatedRes.samples[i].unloading_end_total_moisture_basis_gcv
    dbRes.samples[i].unloading_end.could_be_disputed = updatedRes.samples[i].unloading_end_could_be_disputed
    dbRes.samples[i].unloading_end.disputed_lab = updatedRes.samples[i].unloading_end_disputed_lab
  }
}

module.exports = {
    ServerToClient,
    ClientToServer,
    UpdateClientToServer
}
