const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WalletSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    value: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Wallet', WalletSchema, 'wallets');