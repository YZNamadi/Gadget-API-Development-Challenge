const Gadget = require('../models/Gadget');


const getMissionSuccessProbability = () => Math.floor(Math.random() * 101);

exports.getAllGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { where: { status } } : {};
    const gadgets = await Gadget.findAll(filter);
    
    const gadgetsWithProbability = gadgets.map(gadget => ({
      ...gadget.dataValues,
      missionSuccessProbability: `${getMissionSuccessProbability()}%`
    }));
    res.json(gadgetsWithProbability);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gadgets.' });
  }
};


const codenames = ['The Nightingale', 'The Kraken', 'The Phoenix', 'The Shadow'];
const getRandomCodename = () => codenames[Math.floor(Math.random() * codenames.length)];

exports.addGadget = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Gadget name is required.' });
    }
    const gadget = await Gadget.create({
      name: getRandomCodename(),
     
    });
    res.status(201).json(gadget);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add gadget.' });
  }
};



const crypto = require('crypto');

const generateConfirmationCode = () => crypto.randomBytes(4).toString('hex');

exports.selfDestructGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findByPk(id);
    if (!gadget) {
      return res.status(404).json({ error: 'Gadget not found.' });
    }
    
    const confirmationCode = generateConfirmationCode();
   
    await gadget.update({ status: 'Destroyed' });
    res.json({ message: 'Self-destruct sequence initiated!', confirmationCode });
  } catch (error) {
    res.status(500).json({ error: 'Self-destruct sequence failed.' });
  }
};
