import Image from 'next/image';

export default function ProfilePhoto() {
  return (
    <Image
      src="/img/profile.png"
      alt="Manuel Warum"
      width={420}
      height={420}
      className="profile-photo"
      priority
    />
  );
}
