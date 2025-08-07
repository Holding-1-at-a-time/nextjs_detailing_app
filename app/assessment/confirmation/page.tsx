import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, Mail, Phone } from 'lucide-react'
import Link from "next/link"

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Submitted!</h1>
          <p className="text-gray-600">Thank you for choosing AutoDetail Pro</p>
        </div>

        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle>What happens next?</CardTitle>
            <CardDescription>Here's what you can expect from our team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Review & Analysis</h3>
                <p className="text-gray-600 text-sm">
                  Our team will carefully review your vehicle assessment and service requirements within 2-4 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Personalized Quote</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive a detailed quote via email with service recommendations and pricing within 24 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Schedule Service</h3>
                <p className="text-gray-600 text-sm">
                  Once you approve the quote, we'll contact you to schedule your preferred service date and time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">Need immediate assistance?</h3>
          <p className="text-blue-700 text-sm mb-4">
            If you have urgent questions or need to modify your assessment, don't hesitate to contact us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Call (555) 123-4567
            </Button>
            <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
              Email Us
            </Button>
          </div>
        </div>

        <div className="text-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
