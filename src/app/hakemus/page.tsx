import { deleteProfile, upsertProfile } from '@/lib/features/profile/profile.actions'
import { getUserProfile } from '@/lib/features/profile/profile.service'
import { userExists } from '@/lib/utils/auth'
import { FaArrowLeft, FaPaperPlane, FaSave, FaTrashAlt } from 'react-icons/fa'
import { FileUpload } from './FileUpload'

export default async function Hakemus() {
  await userExists()
  const profile = await getUserProfile()

  return (
    <form className="gap-5 flex flex-col items-stretch justify-start w-full" action={upsertProfile}>
      <h1 className="text-2xl font-bold text-center">WappuHeila Profiili</h1>

      <div className="relative mt-2 md:mt-0 font-medium group">
        <input
          type="text"
          id="username"
          name="username"
          maxLength={20}
          required
          placeholder=" "
          defaultValue={profile?.username}
          className="peer p-2 w-full h-full bg-white border-2 border-black rounded-none outline-none"
        />
        <label
          htmlFor="username"
          className="peer absolute text-black duration-300 left-2 top-2 transform -translate-y-8 scale-90 -translate-x-3 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:-translate-x-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0"
        >
          Käyttäjänimi
        </label>
      </div>

      <div className="relative mt-2 font-medium group">
        <input
          type="text"
          id="title"
          name="title"
          maxLength={60}
          required
          placeholder=" "
          defaultValue={profile?.title || undefined}
          className="peer p-2 w-full h-full bg-white border-2 border-black rounded-none outline-none"
        />
        <label
          htmlFor="title"
          className="peer absolute text-black duration-300 left-2 top-2 transform -translate-y-8 scale-90 -translate-x-3 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:-translate-x-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0"
        >
          Otsikko
        </label>
      </div>

      <div className="relative mt-2 font-medium group">
        <textarea
          id="bio"
          name="bio"
          maxLength={400}
          rows={6}
          required
          placeholder=" "
          defaultValue={profile?.bio || undefined}
          className="peer p-2 w-full h-full bg-white border-2 border-black rounded-none outline-none resize-y"
        />
        <label
          htmlFor="bio"
          className="peer absolute text-black duration-300 left-2 top-2 transform -translate-y-8 scale-90 -translate-x-3 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:-translate-x-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0"
        >
          Hakemus
        </label>
      </div>

      <div className="relative mt-2 font-medium group">
        <input
          type="text"
          id="contact"
          name="contact"
          maxLength={30}
          required
          placeholder=" "
          defaultValue={profile?.contact || undefined}
          className="peer p-2 w-full h-full bg-white border-2 border-black rounded-none outline-none"
        />
        <label
          htmlFor="contact"
          className="peer absolute text-black duration-300 left-2 top-2 transform -translate-y-8 scale-90 -translate-x-3 peer-focus:-translate-y-8 peer-focus:scale-90 peer-focus:-translate-x-3 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-x-0"
        >
          Yhteydenotot
        </label>
      </div>

      <div className="relative font-medium group flex flex-col">
        <label htmlFor="overallsColor" className="peer text-black">
          Haalareiden väri
        </label>
        <input
          type="color"
          id="overallsColor"
          name="overallsColor"
          required
          placeholder="#000000"
          defaultValue={profile?.overallsColor || '#000000'}
          className="peer p-2 w-16 h-16 bg-white border-2 border-black rounded-none outline-none"
        />
      </div>

      <div className="relative font-medium group">
        <label htmlFor="image" className="peer  text-black">
          Hakemuksen kuva (max 2MB)
        </label>
        <FileUpload />
      </div>

      <div className="flex flex-wrap-reverse justify-center gap-6">
        <a href="/" className="relative inline-block px-4 py-2 font-medium group w-min">
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span className="relative text-black group-hover:text-white flex items-center justify-center">
            <i className="mr-2">
              <FaArrowLeft />
            </i>
            Takaisin
          </span>
        </a>
        {profile ? (
          <>
            <button
              type="submit"
              className="relative inline-block px-4 py-2 font-medium group"
              formAction={deleteProfile}
            >
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-red-500 group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-red-500 group-hover:bg-red-500"></span>
              <span className="relative text-black group-hover:text-white flex items-center justify-center">
                <i className="mr-2">
                  <FaTrashAlt />
                </i>
                Poista Hakemus
              </span>
            </button>
            <button type="submit" className="relative inline-block px-4 py-2 font-medium group ">
              <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
              <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
              <span className="relative text-black group-hover:text-white flex items-center justify-center">
                <i className="mr-2">
                  <FaSave />
                </i>
                Tallenna Hakemus
              </span>
            </button>
          </>
        ) : (
          <button type="submit" className="relative inline-block px-4 py-2 font-medium group ">
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
            <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
            <span className="relative text-black group-hover:text-white flex items-center justify-center">
              <i className="mr-2">
                <FaPaperPlane />
              </i>
              Lähetä Hakemus
            </span>
          </button>
        )}
      </div>
    </form>
  )
}
