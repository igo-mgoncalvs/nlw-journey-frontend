import { useEffect, useState } from 'react'
import { Link2, Plus } from "lucide-react";
import { useParams } from 'react-router-dom';
import { api } from '../../lib/axios';

interface Links {
  id: string
  title: string
  url: string
}

interface ImportantLinksProps {
  openCreateLinkModal: () => void
}

export function ImportantLinks ({
  openCreateLinkModal
}: ImportantLinksProps) {
  const [links, setLinks] = useState<Links[] | undefined>()

  const { tripId } = useParams()

  useEffect(() => {
    api.get(`/trips/${tripId}/links`)
      .then(({data}) => {
        setLinks(data.links)
      })

  }, [tripId])

  return (
    <div className='space-y-6'>
      <h2 className='font-semibold text-xl'>Links importantes</h2>

      <div className='space-y-5'>
        {links?.map((link) => (
          <div className='flex items-center justify-between gap-4'>
              <div className='space-y-1.5'>
                <span className='block font-medium text-zinc-100'>{link.title}</span>
                <a target='_blank' href={link.url} className='block  text-xs text-zinc-400 truncate hover:text-zinc-200'>
                  {link.url}
                </a>
              </div>
            <Link2 className='text-zinc-400 size-5 shrink-0'/>
          </div>
        ))}
      </div>

      <button
        onClick={openCreateLinkModal}
        className='bg-zinc-800 w-full justify-center text-zinc-200 rounded-lg px-5 h-11 font-medium flex items-center gap-2 hover:bg-zinc-700'
      >
        <Plus className='size-5'/>
        Cadastrar novo link
      </button>
    </div>
  )
}