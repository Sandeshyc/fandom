import React from 'react'
import {
  ReportProblemOutlined,
} from '@mui/icons-material';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
 
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
 
    return { hasError: true }
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
    console.log({ error, errorInfo })
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className='flex justify-center items-center min-h-screen min-w-screen'>          
          <div className='rounded-md w-[90%] max-w-[720px] bg-[#262626] relative text-white p-4 py-8 text-center'>
            <ReportProblemOutlined 
                sx={{
                    color: 'gray',
                    fontSize: '4rem',                
                }}
                />
            <h3 className="text-white/80 text-2xl font-semibold mb-2">Opps!</h3>
            <p className="text-white/80 text-sm md:text-base mb-6">Sorry, there is an error!</p>
            <div className="gap-2 flex justify-center">
                  <button
                  className="bg-gray-700 text-white/70 text-sm md:text-base px-4 py-2 rounded-md"
                  onClick={() => this.setState({ hasError: false })}>
                      Try Again
                  </button>
            </div>
          </div>
        </div>
      )
    }
 
    // Return children components in case of no error
 
    return this.props.children
  }
}
 
export default ErrorBoundary