import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { Input } from './ui/input';
import { Textarea } from "./ui/textarea"
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select';

function Report() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    severity: 'low',
  });
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const emailParams = {
    name: formData.name,
    email: formData.email,
    message: formData.severity + formData.description, // Using description as message in the template
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICEID, 
        import.meta.env.VITE_EMAILJS_TEMPLATEID,
        emailParams,
        import.meta.env.VITE_EMAILJS_USERID
      );
      console.log('Bug Report Submitted:', result.text);
      alert('Thank you for reporting the bug! Our team will review it soon.');
      setFormData({ name: '', email: '', description: '', severity: 'low' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6  rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Report a Bug</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-2"
            required
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description">Bug Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2"
            required
            placeholder="Describe the bug in detail"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="severity">Severity</Label>
          <Select
            id="severity"
            name="severity"
            value={formData.severity}
            onValueChange={(value) => setFormData({ ...formData, severity: value })}
            className="mt-2"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Bug Report'}
        </Button>
      </form>
    </div>
  );
}

export default Report;
