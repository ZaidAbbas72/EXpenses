import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import emailjs from 'emailjs-com';

const Report = ({ expenses }) => {
  const [filter, setFilter] = useState('monthly');
  const [email, setEmail] = useState('');

  // Filter expenses by month or year
  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (filter === 'monthly') {
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    }
    if (filter === 'yearly') {
      return expenseDate.getFullYear() === currentYear;
    }
    return expense;
  });

  // Generate PDF report
  const generatePDF = () => {
    const report = document.getElementById('report');
    html2canvas(report).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'pt', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('expense_report.pdf');
    });
  };

  // Send email with report
  const sendEmail = (e) => {
    e.preventDefault();
    const report = document.getElementById('report');
    html2canvas(report).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'pt', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0);
      const pdfData = pdf.output('datauristring'); // Get the base64 data URI

      const templateParams = {
        user_email: email,
        report: pdfData, // Attach the PDF as base64
      };

      emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
        .then((result) => {
          alert('Email sent successfully!');
        }, (error) => {
          console.log(error.text);
        });
    });
  };

  return (
    <div>
      <h2>Expense Report</h2>

      {/* Filter Toggle */}
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Report Table */}
      <div id="report">
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>${expense.amount}</td>
                <td>{new Date(expense.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Generate PDF Button */}
      <button onClick={generatePDF}>Download PDF</button>

      {/* Send Email Form */}
      <form onSubmit={sendEmail}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send Report via Email</button>
      </form>
    </div>
  );
};

export default Report;
2114132