
const Order = require("../../models/Order");

const getAllOrderOfAllUsers = async (req, res) => {
    try{
        const order = await Order.find({});

        if(!order.length) {
            return res.status(404).json({
                success: false,
                message: "No Orders Found!",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some Error Occured!",
        });
    }
};


const getOrderDetailsForAdmin = async (req, res) => {
    try{
        const  { id }  = req.params;

        const order = await Order.findById(id);

        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order Not Found!",
            });
        }

        res.status(200).json({
            success: true,
            data: order,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured!",
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { orderStatus } = req.body;
  
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found!",
        });
      }
  
      await Order.findByIdAndUpdate(id, { orderStatus });
  
      res.status(200).json({
        success: true,
        message: "Order status is updated successfully!",
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: "Some error occured!",
      });
    }
  };
  
  module.exports = {
    getAllOrderOfAllUsers,
    getOrderDetailsForAdmin,
    updateOrderStatus,
  };
