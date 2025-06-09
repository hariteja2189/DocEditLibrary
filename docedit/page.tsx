import DocumentRenderer from '@/app/components/DocumentRenderer';
import { coverPage, sampleDoc} from '@/app/data/coverpage'

export default function DocEdit()
{
    return (
        <div>
            <h1>Welcome to Doc Edit Page</h1>
            <div>
                <DocumentRenderer document={sampleDoc} />
            </div>
        </div>
    )
}