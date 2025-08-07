"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Car, User, MapPin, Calendar } from 'lucide-react'
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import Link from "next/link"

interface AssessmentData {
  // Customer Information
  customerName: string
  email: string
  phone: string
  address: string
  city: string
  zipCode: string
  
  // Vehicle Information
  year: string
  make: string
  model: string
  color: string
  mileage: string
  vehicleType: string
  
  // Service Preferences
  serviceType: string[]
  urgency: string
  budget: string
  preferredDate: string
  preferredTime: string
  location: string
  
  // Vehicle Condition
  exteriorCondition: string
  interiorCondition: string
  paintCondition: string
  hasScratches: boolean
  hasDents: boolean
  hasStains: boolean
  hasOdors: boolean
  lastDetailDate: string
  
  // Additional Information
  specialRequests: string
  hearAboutUs: string
}

const initialData: AssessmentData = {
  customerName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  year: "",
  make: "",
  model: "",
  color: "",
  mileage: "",
  vehicleType: "",
  serviceType: [],
  urgency: "",
  budget: "",
  preferredDate: "",
  preferredTime: "",
  location: "",
  exteriorCondition: "",
  interiorCondition: "",
  paintCondition: "",
  hasScratches: false,
  hasDents: false,
  hasStains: false,
  hasOdors: false,
  lastDetailDate: "",
  specialRequests: "",
  hearAboutUs: ""
}

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<AssessmentData>(initialData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  
  const createAssessment = useMutation(api.assessments.create)

  const totalSteps = 4

  const updateFormData = (field: keyof AssessmentData, value: string | string[] | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleServiceTypeChange = (service: string, checked: boolean) => {
    const currentServices = formData.serviceType
    if (checked) {
      updateFormData("serviceType", [...currentServices, service])
    } else {
      updateFormData("serviceType", currentServices.filter(s => s !== service))
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.customerName && formData.email && formData.phone && formData.address)
      case 2:
        return !!(formData.year && formData.make && formData.model && formData.vehicleType)
      case 3:
        return !!(formData.serviceType.length > 0 && formData.urgency && formData.budget)
      case 4:
        return !!(formData.exteriorCondition && formData.interiorCondition && formData.paintCondition)
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    } else {
      toast.error("Please fill in all required fields")
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      toast.error("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)
    try {
      await createAssessment({
        customerInfo: {
          name: formData.customerName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode
        },
        vehicleInfo: {
          year: parseInt(formData.year),
          make: formData.make,
          model: formData.model,
          color: formData.color,
          mileage: parseInt(formData.mileage) || 0,
          vehicleType: formData.vehicleType
        },
        servicePreferences: {
          serviceTypes: formData.serviceType,
          urgency: formData.urgency,
          budget: formData.budget,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          location: formData.location
        },
        vehicleCondition: {
          exteriorCondition: formData.exteriorCondition,
          interiorCondition: formData.interiorCondition,
          paintCondition: formData.paintCondition,
          hasScratches: formData.hasScratches,
          hasDents: formData.hasDents,
          hasStains: formData.hasStains,
          hasOdors: formData.hasOdors,
          lastDetailDate: formData.lastDetailDate
        },
        additionalInfo: {
          specialRequests: formData.specialRequests,
          hearAboutUs: formData.hearAboutUs
        }
      })
      
      toast.success("Assessment submitted successfully!")
      router.push("/assessment/confirmation")
    } catch (error) {
      toast.error("Failed to submit assessment. Please try again.")
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <User className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Customer Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Full Name *</Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => updateFormData("customerName", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => updateFormData("zipCode", e.target.value)}
                  placeholder="12345"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
                placeholder="Your city"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Car className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Vehicle Information</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Year *</Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => updateFormData("year", e.target.value)}
                  placeholder="2020"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="make">Make *</Label>
                <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => updateFormData("make", e.target.value)}
                  placeholder="Toyota"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => updateFormData("model", e.target.value)}
                  placeholder="Camry"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => updateFormData("color", e.target.value)}
                  placeholder="Silver"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  value={formData.mileage}
                  onChange={(e) => updateFormData("mileage", e.target.value)}
                  placeholder="50000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Vehicle Type *</Label>
              <Select value={formData.vehicleType} onValueChange={(value) => updateFormData("vehicleType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedan</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="coupe">Coupe</SelectItem>
                  <SelectItem value="convertible">Convertible</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                  <SelectItem value="wagon">Wagon</SelectItem>
                  <SelectItem value="van">Van</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Service Preferences</h2>
            </div>

            <div className="space-y-4">
              <Label>Services Needed *</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  "Exterior Wash & Wax",
                  "Interior Deep Clean",
                  "Paint Correction",
                  "Ceramic Coating",
                  "Engine Bay Cleaning",
                  "Headlight Restoration",
                  "Leather Conditioning",
                  "Odor Elimination"
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.serviceType.includes(service)}
                      onCheckedChange={(checked) => handleServiceTypeChange(service, checked as boolean)}
                    />
                    <Label htmlFor={service} className="text-sm">{service}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Urgency *</Label>
              <RadioGroup value={formData.urgency} onValueChange={(value) => updateFormData("urgency", value)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="asap" id="asap" />
                  <Label htmlFor="asap">ASAP (within 1-2 days)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="week" id="week" />
                  <Label htmlFor="week">Within a week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="flexible" id="flexible" />
                  <Label htmlFor="flexible">Flexible timing</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Budget Range *</Label>
              <Select value={formData.budget} onValueChange={(value) => updateFormData("budget", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-100">Under $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200-400">$200 - $400</SelectItem>
                  <SelectItem value="400-600">$400 - $600</SelectItem>
                  <SelectItem value="over-600">Over $600</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => updateFormData("preferredDate", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <Select value={formData.preferredTime} onValueChange={(value) => updateFormData("preferredTime", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8AM - 12PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                    <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Service Location</Label>
              <Select value={formData.location} onValueChange={(value) => updateFormData("location", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile">Mobile (at my location)</SelectItem>
                  <SelectItem value="shop">At your shop</SelectItem>
                  <SelectItem value="either">Either option works</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <MapPin className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold">Vehicle Condition Assessment</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Exterior Condition *</Label>
                <Select value={formData.exteriorCondition} onValueChange={(value) => updateFormData("exteriorCondition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Interior Condition *</Label>
                <Select value={formData.interiorCondition} onValueChange={(value) => updateFormData("interiorCondition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Paint Condition *</Label>
                <Select value={formData.paintCondition} onValueChange={(value) => updateFormData("paintCondition", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Current Issues (check all that apply)</Label>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="scratches"
                    checked={formData.hasScratches}
                    onCheckedChange={(checked) => updateFormData("hasScratches", checked as boolean)}
                  />
                  <Label htmlFor="scratches">Scratches or swirl marks</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dents"
                    checked={formData.hasDents}
                    onCheckedChange={(checked) => updateFormData("hasDents", checked as boolean)}
                  />
                  <Label htmlFor="dents">Dents or dings</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="stains"
                    checked={formData.hasStains}
                    onCheckedChange={(checked) => updateFormData("hasStains", checked as boolean)}
                  />
                  <Label htmlFor="stains">Interior stains</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="odors"
                    checked={formData.hasOdors}
                    onCheckedChange={(checked) => updateFormData("hasOdors", checked as boolean)}
                  />
                  <Label htmlFor="odors">Unpleasant odors</Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastDetailDate">Last Professional Detail</Label>
              <Input
                id="lastDetailDate"
                type="date"
                value={formData.lastDetailDate}
                onChange={(e) => updateFormData("lastDetailDate", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequests">Special Requests or Notes</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => updateFormData("specialRequests", e.target.value)}
                placeholder="Any specific concerns or requests..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>How did you hear about us?</Label>
              <Select value={formData.hearAboutUs} onValueChange={(value) => updateFormData("hearAboutUs", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Search</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="referral">Friend/Family Referral</SelectItem>
                  <SelectItem value="advertisement">Advertisement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicle Assessment</h1>
          <p className="text-gray-600">Help us understand your vehicle's needs for an accurate quote</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Badge variant="outline">Step {currentStep}</Badge>
                </CardTitle>
                <CardDescription className="mt-2">
                  {currentStep === 1 && "Let's start with your contact information"}
                  {currentStep === 2 && "Tell us about your vehicle"}
                  {currentStep === 3 && "What services do you need?"}
                  {currentStep === 4 && "Assess your vehicle's current condition"}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Assessment"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
