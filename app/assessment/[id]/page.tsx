"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Car, User, Calendar, MapPin, Phone, Mail } from 'lucide-react'
import Link from "next/link"
import { notFound } from "next/navigation"

interface AssessmentDetailPageProps {
  params: {
    id: string
  }
}

export default function AssessmentDetailPage({ params }: AssessmentDetailPageProps) {
  const assessment = useQuery(api.assessments.getById, { 
    id: params.id as Id<"assessments"> 
  })

  if (assessment === null) {
    notFound()
  }

  if (assessment === undefined) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "reviewed": return "bg-blue-100 text-blue-800"
      case "quoted": return "bg-purple-100 text-purple-800"
      case "approved": return "bg-green-100 text-green-800"
      case "completed": return "bg-gray-100 text-gray-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Details</h1>
              <p className="text-gray-600">
                Submitted on {new Date(assessment.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge className={getStatusColor(assessment.status)}>
              {assessment.status}
            </Badge>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Customer Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{assessment.customerInfo.name}</h3>
                  <div className="space-y-2 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{assessment.customerInfo.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{assessment.customerInfo.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Address</h4>
                  <div className="text-sm text-gray-600">
                    <p>{assessment.customerInfo.address}</p>
                    <p>{assessment.customerInfo.city} {assessment.customerInfo.zipCode}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Car className="h-5 w-5" />
                <span>Vehicle Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {assessment.vehicleInfo.year} {assessment.vehicleInfo.make} {assessment.vehicleInfo.model}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">Color:</span> {assessment.vehicleInfo.color}</p>
                    <p><span className="font-medium">Type:</span> {assessment.vehicleInfo.vehicleType}</p>
                    <p><span className="font-medium">Mileage:</span> {assessment.vehicleInfo.mileage.toLocaleString()} miles</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Service Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Requested Services</h4>
                  <div className="flex flex-wrap gap-2">
                    {assessment.servicePreferences.serviceTypes.map((service) => (
                      <Badge key={service} variant="secondary">{service}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Urgency:</span>
                    <p className="text-gray-600 capitalize">{assessment.servicePreferences.urgency}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Budget:</span>
                    <p className="text-gray-600">{assessment.servicePreferences.budget}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Location:</span>
                    <p className="text-gray-600 capitalize">{assessment.servicePreferences.location}</p>
                  </div>
                </div>

                {assessment.servicePreferences.preferredDate && (
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-900">Preferred Date:</span>
                      <p className="text-gray-600">
                        {new Date(assessment.servicePreferences.preferredDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">Preferred Time:</span>
                      <p className="text-gray-600 capitalize">{assessment.servicePreferences.preferredTime}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Condition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Vehicle Condition Assessment</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-900">Exterior:</span>
                    <p className="text-gray-600 capitalize">{assessment.vehicleCondition.exteriorCondition}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Interior:</span>
                    <p className="text-gray-600 capitalize">{assessment.vehicleCondition.interiorCondition}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">Paint:</span>
                    <p className="text-gray-600 capitalize">{assessment.vehicleCondition.paintCondition}</p>
                  </div>
                </div>

                {(assessment.vehicleCondition.hasScratches || 
                  assessment.vehicleCondition.hasDents || 
                  assessment.vehicleCondition.hasStains || 
                  assessment.vehicleCondition.hasOdors) && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Current Issues</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessment.vehicleCondition.hasScratches && (
                        <Badge variant="destructive" className="text-xs">Scratches</Badge>
                      )}
                      {assessment.vehicleCondition.hasDents && (
                        <Badge variant="destructive" className="text-xs">Dents</Badge>
                      )}
                      {assessment.vehicleCondition.hasStains && (
                        <Badge variant="destructive" className="text-xs">Stains</Badge>
                      )}
                      {assessment.vehicleCondition.hasOdors && (
                        <Badge variant="destructive" className="text-xs">Odors</Badge>
                      )}
                    </div>
                  </div>
                )}

                {assessment.vehicleCondition.lastDetailDate && (
                  <div className="text-sm">
                    <span className="font-medium text-gray-900">Last Professional Detail:</span>
                    <p className="text-gray-600">
                      {new Date(assessment.vehicleCondition.lastDetailDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          {(assessment.additionalInfo.specialRequests || assessment.additionalInfo.hearAboutUs) && (
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessment.additionalInfo.specialRequests && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Special Requests</h4>
                      <p className="text-gray-600 text-sm bg-gray-50 p-3 rounded-lg">
                        {assessment.additionalInfo.specialRequests}
                      </p>
                    </div>
                  )}
                  
                  {assessment.additionalInfo.hearAboutUs && (
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">How they heard about us:</span>
                      <p className="text-gray-600 capitalize">{assessment.additionalInfo.hearAboutUs}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
