import { Button, Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateInvoice = () => {
    const [invoiceData, setInvoiceData] = useState({
        invoiceNo: "",
        invoiceDate: "",
        dueDate: "",
        billedBy: "",
        billedTo: "",
        country: "",
        state: "",
        items: [{ description: "", rate: "", quantity: "", gst: "" }],
        total: 0,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvoiceData({ ...invoiceData, [name]: value });
    };

    const addItem = () => {
        setInvoiceData({
            ...invoiceData,
            items: [...invoiceData.items, { description: "", rate: "", quantity: "", gst: "" }],
        });
    };

    return (
        <div className="p-4">
            <Card className="p-6">
                <CardHeader floated={false} shadow={false} className="rounded-none border-b pb-4">
                    <div className="flex justify-between items-center">
                    <Typography variant="h5" color="blue-gray" className="font-bold">
                       CREATE INVOICE
                    </Typography>
                    <Button color="blue" className="mt-4">
                        Print Invoice
                 </Button>
                 </div>
                </CardHeader>
                <CardBody>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="font-semibold">Invoice No #</label>
                            <input type="text" name="invoiceNo" onChange={handleInputChange} placeholder="Enter Invoice" className="border rounded-md p-2 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Invoice Date</label>
                            <DatePicker selected={invoiceData.invoiceDate} onChange={(date) => setInvoiceData({...invoiceData, invoiceDate: date})} placeholderText="Enter invoice date" className="border rounded-md p-2 w-full" />
                        </div>
                        <div className="flex flex-col">
                            <label className="font-semibold">Due Date</label>
                            <DatePicker selected={invoiceData.dueDate} onChange={(date) => setInvoiceData({...invoiceData, dueDate: date})} placeholderText="Enter duo date" className="border rounded-md p-2 w-full" />
                        </div>
                        <div>
                            <label className="font-semibold">Bill To</label>
                            <input type="text" name="billedTo" placeholder="Enter client name" onChange={handleInputChange} className="border rounded-md p-2 w-full" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-purple-100 rounded-md">
                            <Typography variant="h6" className="font-bold">Billed By</Typography>
                            <p>VGI Sooprs Technology Pvt. Ltd.</p>
                            <p>BlueOne Square, Udyog Vihar, Phase 4 Rd</p>
                            <p>Gurugram, Haryana, India - 122016</p>
                            <p>GSTIN: 06AAKCV5021D1ZM</p>
                            <p>PAN: AAKCV5021D</p>
                            <p>Email: contact@sooprs.com</p>
                        </div>
                        <div className="p-4 bg-purple-100 rounded-md">
                            <Typography variant="h6" className="font-bold">Billed To</Typography>
                           
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 my-4">
                        <div>
                            <label className="font-semibold">Country of Supply</label>
                            <select name="country" onChange={handleInputChange} className="border rounded-md p-2 w-full">
                                <option>Select Country</option>
                            </select>
                        </div>
                        <div>
                            <label className="font-semibold">Place of Supply</label>
                            <select name="state" onChange={handleInputChange} className="border rounded-md p-2 w-full">
                                <option>Select State</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 mb-5">
                        <Typography variant="h6">Invoice Items</Typography>
                        {invoiceData.items.map((item, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2 mt-2">
                                <input type="text" placeholder="Description" value={item.description} onChange={(e) => {
                                    let items = [...invoiceData.items];
                                    items[index].description = e.target.value;
                                    setInvoiceData({ ...invoiceData, items });
                                }} className="border rounded-md p-2 w-full" />
                                <input type="text" placeholder="Rate" value={item.rate} onChange={(e) => {
                                    let items = [...invoiceData.items];
                                    items[index].rate = e.target.value;
                                    setInvoiceData({ ...invoiceData, items });
                                }} className="border rounded-md p-2 w-full" />
                                <input type="text" placeholder="Quantity" value={item.quantity} onChange={(e) => {
                                    let items = [...invoiceData.items];
                                    items[index].quantity = e.target.value;
                                    setInvoiceData({ ...invoiceData, items });
                                }} className="border rounded-md p-2 w-full" />
                                <input type="text" placeholder="GST %" value={item.gst} onChange={(e) => {
                                    let items = [...invoiceData.items];
                                    items[index].gst = e.target.value;
                                    setInvoiceData({ ...invoiceData, items });
                                }} className="border rounded-md p-2 w-full" />
                            </div>
                        ))}
                        <Button color="green" onClick={addItem} className="mt-2">Add Item</Button>
                    </div>

                    <div className="p-4 bg-purple-100 rounded-md mb-4">
                        <Typography variant="h6" className="font-bold">Bank Details</Typography>
                        <p>Account Name: VGI Sooprs Technology Pvt. Ltd.</p>
                        <p>Account Number: 0648579371</p>
                        <p>IFSC: KKBK0004605</p>
                        <p>Account Type: Current</p>
                        <p>Bank: Kotak Bank</p>
                    </div>

                   
                </CardBody>
            </Card>
        </div>
    );
};

export default CreateInvoice;