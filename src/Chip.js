export default function Chip({user, deleteChip, lastChip}) {
  return (
    <div className={`w-48  h-10 rounded-full bg-gray flex justify-between items-center px-3 py-1 cursor-pointer bg-gray-400 ${lastChip?.chip?.email === user.email ? 'border border-red-500' : ''}`}>
      <p className='text-sm'>{user.name}</p>
      <p onClick={() => deleteChip(user)}>x</p>
    </div>
  )
}
