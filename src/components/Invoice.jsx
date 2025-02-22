

const Invoice = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
      <h2 className="text-2xl font-bold text-center mb-4">INVOICE</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p><strong>Invoice No #:</strong> 2132131</p>
          <p><strong>Invoice Date:</strong> February 20, 2025</p>
          <p><strong>Due Date:</strong> March 01, 2025</p>
        </div>
        <div className="text-right">
          <p><strong>Billed By:</strong></p>
          <p>VGI Sooprs Technology Pvt. Ltd.</p>
          <p>BlueOne Square, Udyog Vihar, Phase 4 Rd</p>
          <p>Gurugram, Haryana, India - 122016</p>
          <p>GSTIN: 06AAKCV5021D1ZM</p>
          <p>PAN: AAKCV5021D</p>
          <p>Email: contact@sooprs.com</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p><strong>Billed To:</strong></p>
          <p>Uxgraphy</p>
          <p>MIG F 2/9, Jawahar Nanakheda, Ujjain (M.P)</p>
          <p>Phone No.: 7020097550</p>
          <p>Email: harsh@uxgraphy.com</p>
        </div>
        <div className="text-right">
          <p><strong>Country of Supply:</strong> India</p>
          <p><strong>Place of Supply:</strong> Delhi</p>
        </div>
      </div>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Item</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Rate</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">GST %</th>
            <th className="border p-2">IGST</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">dfgh</td>
            <td className="border p-2">-</td>
            <td className="border p-2">₹ 85,25,925.00</td>
            <td className="border p-2">1</td>
            <td className="border p-2">18</td>
            <td className="border p-2">₹ 15,34,666.50</td>
          </tr>
          <tr>
            <td className="border p-2">fvgbhnjj b</td>
            <td className="border p-2">-</td>
            <td className="border p-2">₹ 2,955.00</td>
            <td className="border p-2">1</td>
            <td className="border p-2">8</td>
            <td className="border p-2">₹ 236.40</td>
          </tr>
        </tbody>
      </table>
      <div className="text-right mb-4">
        <p><strong>Amount:</strong> ₹ 85,28,880.00</p>
        <p><strong>Total GST:</strong> ₹ 15,34,902.90</p>
        <p className="text-lg font-bold">Total (INR): ₹ 1,00,63,782.90</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Bank Details</h3>
        <p><strong>Account Name:</strong> VGI Sooprs Technology</p>
        <p><strong>Account Number:</strong> 0648579371</p>
        <p><strong>IFSC:</strong> KKBK0004605</p>
        <p><strong>Account Type:</strong> Current</p>
        <p><strong>Bank:</strong> Kotak Bank</p>
      </div>
      <div>
        <h3 className="text-lg font-bold">Terms and Conditions</h3>
        <p>1. Please quote invoice number when remitting funds</p>
      </div>
    </div>
  );
};

export default Invoice;
