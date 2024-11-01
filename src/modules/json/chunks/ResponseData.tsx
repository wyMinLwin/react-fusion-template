import React from 'react'
import { Label } from '@/components/ui/label'
import { EXAMPLE_RESPONSE_DATA } from '../data'

type ResponseDataProps = {
    responseData: typeof EXAMPLE_RESPONSE_DATA
}

const ResponseData: React.FC<ResponseDataProps> = ({ responseData }) => {
    return (
        <div>
            <p className="text-sm">Object Root</p>

            <div className="data-type">Example: API Response</div>

            <div className="hover:bg-accent grid grid-cols-5 gap-2 p-3 border-b">
                <Label>Key</Label>
                <Label>Description</Label>
                <Label>Type</Label>
                <Label className="col-span-2">Example</Label>
            </div>

            <div className="hover:bg-accent grid grid-cols-5 gap-2 p-3 text-sm border-b">
                <span>-</span>
                <span>message</span>
                <span>string</span>
                <span className="col-span-2">Successfully!</span>
            </div>

            <div className="hover:bg-accent grid grid-cols-5 gap-2 p-3 text-sm border-b">
                <span>-</span>
                <span>status</span>
                <span>int</span>
                <span className="col-span-2">0</span>
            </div>

            <div className="hover:bg-accent grid grid-cols-5 gap-2 p-3 text-sm border-b">
                <span>-</span>
                <span>data</span>
                <span>object</span>
                <span className="col-span-2 break-all">{JSON.stringify(responseData)}</span>
            </div>
        </div>
    )
}

export default ResponseData
