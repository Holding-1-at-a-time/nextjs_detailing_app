"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Eye, Phone, Mail, Calendar, Car, DollarSign, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react'
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedAssessment, setSelectedAssessment] = useState<Id<"assessments"> | null>(null)

  const assessments = useQuery(api.assessments.list)
  const updateStatus = useMutation(api.assessments.updateStatus)

  const filteredAssessments = assessments?.filter(assessment => {
    const matchesSearch = assessment.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         `${assessment.vehicleInfo.year} ${assessment.vehicleInfo.make} ${assessment.vehicleInfo.model}`.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || assessment.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const handleStatusUpdate = async (assessmentId: Id<"assessments">, newStatus: string) => {
    try {
      await updateStatus({ id: assessmentId, status: newStatus })
      toast.success("Status updated successfully")
    } catch (error) {
      toast.error("Failed to update status")
    }
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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "asap": return "text-red-600"
      case "week": return "text-orange-600"
      case "flexible": return "text-green-600"
      default: return "text-gray-600"
    }
  }

  const stats = {
    total: assessments?.length || 0,
    pending: assessments?.filter(a => a.status === "pending").length || 0,
    reviewed: assessments?.filter(a => a.status === "reviewed").length || 0,
    completed: assessments?.filter(a => a.status === "completed").length || 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {stats.total} Total Assessments
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Requests</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Under Review</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.reviewed}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or vehicle..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="quoted">Quoted</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessments List */}
        <div className="grid gap-6">
          {filteredAssessments?.map((assessment) => (
            <Card key={assessment._id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {assessment.customerInfo.name}
                      </h3>
                      <Badge className={getStatusColor(assessment.status)}>
                        {assessment.status}
                      </Badge>
                      <Badge variant="outline" className={getUrgencyColor(assessment.servicePreferences.urgency)}>
                        {assessment.servicePreferences.urgency === "asap" ? "ASAP" : 
                         assessment.servicePreferences.urgency === "week" ? "This Week" : "Flexible"}
                      </Badge>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Car className="h-4 w-4" />
                        <span>{assessment.vehicleInfo.year} {assessment.vehicleInfo.make} {assessment.vehicleInfo.model}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{assessment.customerInfo.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{assessment.customerInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4" />
                        <span>{assessment.servicePreferences.budget}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        <strong>Services:</strong> {assessment.servicePreferences.serviceTypes.join(", ")}
                      </p>
                      {assessment.servicePreferences.preferredDate && (
                        <p className="text-sm text-gray-600 mt-1">
                          <strong>Preferred Date:</strong> {new Date(assessment.servicePreferences.preferredDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Select
                      value={assessment.status}
                      onValueChange={(value) => handleStatusUpdate(assessment._id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="reviewed">Reviewed</SelectItem>
                        <SelectItem value="quoted">Quoted</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAssessment(assessment._id)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>

                {/* Vehicle Condition Summary */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Vehicle Condition</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Exterior:</span>
                      <span className="ml-2 font-medium">{assessment.vehicleCondition.exteriorCondition}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Interior:</span>
                      <span className="ml-2 font-medium">{assessment.vehicleCondition.interiorCondition}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Paint:</span>
                      <span className="ml-2 font-medium">{assessment.vehicleCondition.paintCondition}</span>
                    </div>
                  </div>
                  
                  {(assessment.vehicleCondition.hasScratches || 
                    assessment.vehicleCondition.hasDents || 
                    assessment.vehicleCondition.hasStains || 
                    assessment.vehicleCondition.hasOdors) && (
                    <div className="mt-2">
                      <span className="text-gray-600 text-sm">Issues:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {assessment.vehicleCondition.hasScratches && (
                          <Badge variant="secondary" className="text-xs">Scratches</Badge>
                        )}
                        {assessment.vehicleCondition.hasDents && (
                          <Badge variant="secondary" className="text-xs">Dents</Badge>
                        )}
                        {assessment.vehicleCondition.hasStains && (
                          <Badge variant="secondary" className="text-xs">Stains</Badge>
                        )}
                        {assessment.vehicleCondition.hasOdors && (
                          <Badge variant="secondary" className="text-xs">Odors</Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {assessment.additionalInfo.specialRequests && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Special Requests</h4>
                    <p className="text-sm text-blue-800">{assessment.additionalInfo.specialRequests}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAssessments?.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Search className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assessments found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
