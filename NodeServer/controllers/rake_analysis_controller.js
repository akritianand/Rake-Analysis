const Rake = require('../models/rake-model')
const maps = require('../util/mapping')
const PyShell = require('python-shell')
const fs = require('fs');

createRake = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Rake',
        })
    }

    const rake = new Rake(maps.ClientToServer(body))

    if (!rake) {
        return res.status(400).json({ success: false, error: err })
    }

    rake
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                message: 'Rake created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Rake not created!',
            })
        })
    }

getRakes = async (req, res) => {
  const body = req.body
  var obj

  if (body.rake_no)
    obj = {rake_no: body.rake_no};

  if (body.rr_no)
    obj = {rr_no: body.rr_no};

  if (body.rake_loading_date)
    if (body.show_only_disputed_rakes)
      obj = {
        is_disputed: true,
        rake_loading_date: { $gte: body.rake_loading_date.start_date, $lte: body.rake_loading_date.end_date }
      }
    else
      obj = {rake_loading_date: { $gte: body.rake_loading_date.start_date, $lte: body.rake_loading_date.end_date }};

  if (body.rake_unloading_date)
    if (body.show_only_disputed_rakes)
      obj = {
        is_disputed: true,
        rake_unloading_date: { $gte: body.rake_unloading_date.start_date, $lte: body.rake_unloading_date.end_date }
      }
    else
      obj = {rake_unloading_date: { $gte: body.rake_unloading_date.start_date, $lte: body.rake_unloading_date.end_date }};

  if (body.sample_collection_date)
    if (body.show_only_disputed_rakes)
      obj = {
        is_disputed: true,
        sample_collection_date: { $gte: body.sample_collection_date.start_date, $lte: body.sample_collection_date.end_date }
      }
    else
      obj = {sample_collection_date: { $gte: body.sample_collection_date.start_date, $lte: body.sample_collection_date.end_date }};

  await Rake.find(obj, (err, rake) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!rake) {
          return res
              .status(404)
              .json({ success: false, error: `Rake not found` })
      }
      return res.status(200).json({ success: true, data: maps.ServerToClient(rake) })
  }).catch(err => console.log(err))
}

updateRake = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

        //console.log(body)

    Rake.findOne({ 'rr_no': req.params.rr_no }, (err, rake) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Rake not found!',
            })
        }
        maps.UpdateClientToServer(rake, body)

        rake
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: rake._id,
                    message: 'Rake updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Rake not updated!',
                })
            })
    })
}

downloadRakes = async (req, res) => {
  const body = req.body

  if (!body) {
      return res.status(400).json({
          success: false,
          error: 'You must provide a body to convert',
      })
  }

  rakes = []
  for (b of body) {
    rakes.push(maps.ClientToServer(b))
  }

  pyshell = PyShell.PythonShell.run(__dirname + '/../util/json_to_excel.py', { args: [JSON.stringify(rakes)] })

  pyshell.on('message', function (message) {
    console.log(message)
  });

  pyshell.end(function (err) {
    if (err) {
      return res.status(404).json({
          err,
          message: 'Could not convert!',
      })
    }

    res.download(__dirname + '/../RakeAnalysis.xlsx', function(err) {
      if (err) {
        console.log(err);
      }
      fs.unlink(__dirname + '/../RakeAnalysis.xlsx', function(){
          console.log("File was deleted")
      });
    });
  })
}

// deleteRake = async (req, res) => {
//     await Rake.findOneAndDelete({ _id: req.params.id }, (err, rake) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//
//         if (!rake) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `rake not found` })
//         }
//
//         return res.status(200).json({ success: true, data: rake })
//     }).catch(err => console.log(err))
// }

// getRakes = async (req, res) => {
//     await Rake.find({}, (err, rakes) => {
//         if (err) {
//             return res.status(400).json({ success: false, error: err })
//         }
//         if (!rakes.length) {
//             return res
//                 .status(404)
//                 .json({ success: false, error: `Rake not found` })
//         }
//         return res.status(200).json({ success: true, data: rakes })
//     }).catch(err => console.log(err))
// }

module.exports = {
    createRake,
    updateRake,
    //deleteRake,
    getRakes,
    downloadRakes,
    //getRakeById,
}
