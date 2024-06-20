import { getCollections } from "@/lib/actions/actions";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-0 mx-0 md:px-5 md:mx-5">
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <Marquee
          gradient={true}
          gradientWidth={80}
          speed={30}
          className="w-full overflow-hidden"
          pauseOnHover
        >
          {collections.map((collection: CollectionType) => (
            <Link href={`/collections/${collection._id}`} key={collection._id}>
              <Image
                key={collection._id}
                src={collection.image}
                alt={collection.title}
                width={240}
                height={100}
                className="w-[100px] md:w-[200px] h-auto mx-4 md:mx-10 rounded-lg cursor-pointer transform transition duration-300 hover:scale-110"
              />
            </Link>
          ))}
        </Marquee>
      )}
    </div>
  );
};

export default Collections;
