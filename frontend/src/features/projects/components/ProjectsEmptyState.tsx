import Button from '../../../components/ui/Button'

export default function ProjectsEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
      <h2 className="text-lg font-semibold text-slate-950">Your projects start here</h2>
      <p className="mb-6 mt-2 text-sm text-slate-600">Create your first project to give your next idea a home.</p>
      <Button onClick={onCreate}>Create project</Button>
    </div>
  )
}

