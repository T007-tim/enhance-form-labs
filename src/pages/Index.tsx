import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle2, AlertCircle } from "lucide-react";

const Index = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    birthdate: "",
    website: "",
    favoriteColor: "#3b82f6",
    quantity: 1,
    rating: 5,
    timeSlot: "",
    password: "",
    bio: "",
    country: "",
    agree: false,
    newsletter: false,
  });

  const [validationMessages, setValidationMessages] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    // Clear validation message when user starts typing
    if (validationMessages[name]) {
      setValidationMessages(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const messages: Record<string, string> = {};
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      messages.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    const phoneRegex = /^\+?[\d\s-()]+$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      messages.phone = "Please enter a valid phone number";
      isValid = false;
    }

    // URL validation
    try {
      if (formData.website) new URL(formData.website);
    } catch {
      messages.website = "Please enter a valid URL";
      isValid = false;
    }

    // Password strength
    if (formData.password.length < 8) {
      messages.password = "Password must be at least 8 characters";
      isValid = false;
    }

    // Agreement validation
    if (!formData.agree) {
      messages.agree = "You must agree to the terms";
      isValid = false;
    }

    setValidationMessages(messages);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast.success("Form submitted successfully!", {
        description: "All fields are valid and data has been processed.",
      });
      console.log("Form Data:", formData);
    } else {
      toast.error("Validation failed", {
        description: "Please check the form for errors and try again.",
      });
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      birthdate: "",
      website: "",
      favoriteColor: "#3b82f6",
      quantity: 1,
      rating: 5,
      timeSlot: "",
      password: "",
      bio: "",
      country: "",
      agree: false,
      newsletter: false,
    });
    setValidationMessages({});
    toast.info("Form reset", {
      description: "All fields have been cleared.",
    });
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <main className="container max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Enhanced HTML5 Form
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive demonstration of HTML5 form features, validation, and semantic structure
          </p>
        </header>

        {/* Features List */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-success" />
                Key Features
              </CardTitle>
              <CardDescription>This form demonstrates modern web standards</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="grid md:grid-cols-2 gap-4">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>HTML5 input types (email, tel, url, date, color, number, range, time, password)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Client-side validation with custom JavaScript</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Semantic HTML5 structure (header, main, section, article)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Accessibility features (ARIA labels, proper form labels)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Form attributes (placeholder, required, autocomplete, readonly)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span>Responsive design with Tailwind CSS</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Form Validation Table */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle>Form Field Requirements</CardTitle>
              <CardDescription>Understanding validation rules for each field</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="p-3 text-left font-semibold">Field Name</th>
                      <th className="p-3 text-left font-semibold">Input Type</th>
                      <th className="p-3 text-left font-semibold">Validation</th>
                      <th className="p-3 text-left font-semibold">Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3">Full Name</td>
                      <td className="p-3"><code className="bg-muted px-2 py-1 rounded">text</code></td>
                      <td className="p-3">Min 2 characters</td>
                      <td className="p-3"><CheckCircle2 className="h-5 w-5 text-success" /></td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3">Email Address</td>
                      <td className="p-3"><code className="bg-muted px-2 py-1 rounded">email</code></td>
                      <td className="p-3">Valid email format</td>
                      <td className="p-3"><CheckCircle2 className="h-5 w-5 text-success" /></td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3">Phone Number</td>
                      <td className="p-3"><code className="bg-muted px-2 py-1 rounded">tel</code></td>
                      <td className="p-3">Valid phone format</td>
                      <td className="p-3"><CheckCircle2 className="h-5 w-5 text-success" /></td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3">Website URL</td>
                      <td className="p-3"><code className="bg-muted px-2 py-1 rounded">url</code></td>
                      <td className="p-3">Valid URL format</td>
                      <td className="p-3"><AlertCircle className="h-5 w-5 text-muted-foreground" /></td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/30 transition-colors">
                      <td className="p-3">Password</td>
                      <td className="p-3"><code className="bg-muted px-2 py-1 rounded">password</code></td>
                      <td className="p-3">Min 8 characters</td>
                      <td className="p-3"><CheckCircle2 className="h-5 w-5 text-success" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Main Form */}
        <article>
          <Card>
            <CardHeader>
              <CardTitle>Registration Form</CardTitle>
              <CardDescription>Fill out all required fields to submit the form</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Personal Information */}
                <fieldset className="space-y-4 border border-border rounded-lg p-6">
                  <legend className="text-lg font-semibold px-2">Personal Information</legend>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      required
                      minLength={2}
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={validationMessages.fullName ? "border-destructive" : ""}
                    />
                    {validationMessages.fullName && (
                      <p className="text-sm text-destructive">{validationMessages.fullName}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className={validationMessages.email ? "border-destructive" : ""}
                      />
                      {validationMessages.email && (
                        <p className="text-sm text-destructive">{validationMessages.email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        Phone Number <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={validationMessages.phone ? "border-destructive" : ""}
                      />
                      {validationMessages.phone && (
                        <p className="text-sm text-destructive">{validationMessages.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="birthdate">Date of Birth</Label>
                      <Input
                        id="birthdate"
                        name="birthdate"
                        type="date"
                        autoComplete="bday"
                        max={new Date().toISOString().split('T')[0]}
                        value={formData.birthdate}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website URL</Label>
                      <Input
                        id="website"
                        name="website"
                        type="url"
                        placeholder="https://example.com"
                        autoComplete="url"
                        value={formData.website}
                        onChange={handleInputChange}
                        className={validationMessages.website ? "border-destructive" : ""}
                      />
                      {validationMessages.website && (
                        <p className="text-sm text-destructive">{validationMessages.website}</p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* Preferences */}
                <fieldset className="space-y-4 border border-border rounded-lg p-6">
                  <legend className="text-lg font-semibold px-2">Preferences</legend>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="favoriteColor">Favorite Color</Label>
                      <div className="flex gap-2 items-center">
                        <Input
                          id="favoriteColor"
                          name="favoriteColor"
                          type="color"
                          value={formData.favoriteColor}
                          onChange={handleInputChange}
                          className="h-10 w-20"
                        />
                        <span className="text-sm text-muted-foreground">{formData.favoriteColor}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity (1-100)</Label>
                      <Input
                        id="quantity"
                        name="quantity"
                        type="number"
                        min={1}
                        max={100}
                        value={formData.quantity}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">
                      Rating: <span className="font-bold text-primary">{formData.rating}/10</span>
                    </Label>
                    <Input
                      id="rating"
                      name="rating"
                      type="range"
                      min={1}
                      max={10}
                      value={formData.rating}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeSlot">Preferred Time Slot</Label>
                    <Input
                      id="timeSlot"
                      name="timeSlot"
                      type="time"
                      value={formData.timeSlot}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select a country</option>
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                      <option value="au">Australia</option>
                      <option value="de">Germany</option>
                      <option value="fr">France</option>
                      <option value="jp">Japan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </fieldset>

                {/* Security */}
                <fieldset className="space-y-4 border border-border rounded-lg p-6">
                  <legend className="text-lg font-semibold px-2">Security</legend>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter a secure password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={handleInputChange}
                      className={validationMessages.password ? "border-destructive" : ""}
                    />
                    {validationMessages.password && (
                      <p className="text-sm text-destructive">{validationMessages.password}</p>
                    )}
                    <p className="text-xs text-muted-foreground">Must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio (Read Only Example)</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      placeholder="This field is read-only..."
                      readOnly
                      value="This is a demonstration of a read-only textarea field. It cannot be edited."
                      className="resize-none bg-muted"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Message</Label>
                    <Textarea
                      id="message"
                      name="bio"
                      placeholder="Tell us more about yourself..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="resize-none"
                      rows={4}
                      maxLength={500}
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {formData.bio.length}/500 characters
                    </p>
                  </div>
                </fieldset>

                {/* Terms and Conditions */}
                <fieldset className="space-y-4 border border-border rounded-lg p-6">
                  <legend className="text-lg font-semibold px-2">Terms & Preferences</legend>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        id="agree"
                        name="agree"
                        type="checkbox"
                        required
                        checked={formData.agree}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                      <Label htmlFor="agree" className="font-normal cursor-pointer">
                        I agree to the terms and conditions <span className="text-destructive">*</span>
                      </Label>
                    </div>
                    {validationMessages.agree && (
                      <p className="text-sm text-destructive ml-7">{validationMessages.agree}</p>
                    )}

                    <div className="flex items-start gap-3">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                      <Label htmlFor="newsletter" className="font-normal cursor-pointer">
                        Subscribe to our newsletter for updates and special offers
                      </Label>
                    </div>
                  </div>
                </fieldset>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button type="submit" className="flex-1" size="lg">
                    Submit Form
                  </Button>
                  <Button type="button" variant="outline" onClick={handleReset} size="lg">
                    Reset Form
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </article>

        {/* Footer */}
        <footer className="mt-12 text-center text-muted-foreground">
          <p className="text-sm">
            This form demonstrates HTML5 features including semantic structure, validation,
            various input types, and accessibility best practices.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
