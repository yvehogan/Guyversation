import { Check, Circle } from "lucide-react"

interface StepIndicatorProps {
  steps: { id: string; label: string }[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex flex-col">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`
              flex items-center justify-center w-8 h-8 rounded-full 
              ${
                index < currentStep 
                  ? "bg-primary-400 text-white" 
                  : index === currentStep
                    ? "text-primary-400" 
                    : "text-grey-500 font-light"
              }
            `}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                <Circle 
                  className={`h-6 w-6 ${index === currentStep ? "stroke-primary-400 stroke-[2.5px]" : ""}`} 
                  fill="transparent"
                />
              )}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-0.5 h-24 ${index < currentStep ? "bg-primary-400" : index === currentStep ? "bg-primary-400" : "bg-gray-200"}`} />
            )}
          </div>
          <div className="pt-1">
            <p className={`${index <= currentStep ? "text-neutral-100 font-medium" : "text-grey-500 font-light"}`}>{step.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}