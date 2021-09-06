const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    
    Title:{
        type: String,
        required: true,
    },
    body:{
         type: String,
         required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
   },
   created_at:{
    type: Date,
    default: Date.now,
},

});

const List = mongoose.model('List',ListSchema);

module.exports=List;