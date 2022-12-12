const express = require("express");
const router = new express.Router();
const validator = require("validator");
const CustomerDetails = require("../models/customer");
const Payment = require("../models/payment")
const app = express();
app.use(router);

function completePayment() {
    return true;
}

router.post("/addCustomer", async (req, res) => {
    try {
        if (validator.isMobilePhone(req.body.contact.toString(), "en-IN")) {
            const contact = req.body.contact;
            const check = await CustomerDetails.findOne({ where: { mobileNo: contact } });
            if (!check) {
                const customer = await CustomerDetails.create({ mobileNo: contact });
                res.status(200).send({
                    code: 200,
                    status: "Success",
                    message: "User Entry Done!",
                    id: customer.id,
                    monthStatus: "Different"
                });
            } else {
                const currentMonth = new Date().getMonth();
                const customer = await CustomerDetails.findOne({ where: { mobileNo: contact } })
                const payment = await Payment.findOne({ where: { customerDetailId: customer.id } });
                if ((currentMonth + 1) === payment.month) {
                    res.status(200).send({
                        code: 200,
                        status: "Success",
                        message: "User's payment of this month is done!",
                        currentBatch: customer.batch,
                        monthStatus: "Same"
                    });
                } else {
                    res.status(200).send({
                        code: 200,
                        status: "Success",
                        message: "Batch selection and Payment has to be done!",
                        monthStatus: "Different"
                    });
                }
            }
        } else throw new Error("Enter Correct Mobile Number!")
    } catch (error) {
        res.status(400).send({
            code: "400",
            status: "failed",
            message: error.message,
        })
    }
})

router.post("/addInfo", async (req, res) => {
    try {
        if (
            req.body.contact &&
            req.body.monthStatus
        ) {
            const { fullName, contact, DOB, batch, monthStatus } = req.body;
            let email;
            if (req.body.email) {
                email = req.body.email;
            } else {
                email = null;
            }
            if (monthStatus === "Different") {
                const currentYear = new Date().getFullYear();
                const birthYear = DOB.split('-')[2];
                const checkAge = currentYear - birthYear;
                if (checkAge >= 18 && checkAge <= 65) {
                    await CustomerDetails.update({
                        fullName, DOB, batch, email
                    }, {
                        where: { mobileNo: contact }
                    });
                    const customerId = await CustomerDetails.findOne({ where: { mobileNo: contact } })
                    const checkPaymentStatus = completePayment();
                    if (checkPaymentStatus) {
                        await Payment.create({
                            month: new Date().getMonth() + 1,
                            amount: 500,
                            customerDetailId: customerId.id
                        })
                        res.status(200).send({
                            code: 200,
                            status: "Success",
                            message: "Payment Done successfully!",
                            batchSelected : customerId.batch
                        });
                    } else throw new Error("Payment Falied!")
                } else throw new Error("This age people are not allowed!")
            }else if(monthStatus === "Same"){
                if (req.body.batch) {
                    const batch = req.body.batch;
                    await CustomerDetails.update({
                        batch
                    }, {
                        where: { mobileNo: contact }
                    })
                    const customer = await CustomerDetails.findOne({ where: { mobileNo: contact } });
                    const checkPaymentStatus = completePayment();
                    if (checkPaymentStatus) {
                        await Payment.create({
                            month: new Date().getMonth() + 1,
                            amount: 500,
                            customerDetailId: customer.id
                        })
                        res.status(200).send({
                            code: 200,
                            status: "Success",
                            message: "Payment Done successfully for your new month!",
                            batchSelected: customer.batch
                        });
                    }
                } else throw new Error("Please select batch for this month!")
            }
        } else throw new Error("Fill all the fields!")
    } catch (error) {
        res.status(400).send({
            code: "400",
            status: "failed",
            message: error.message,
        })
    }
})

module.exports = router;