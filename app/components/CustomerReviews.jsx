import { Rating } from "@mui/material";

export default function CustomerReviews() {
    const list = [
        {
            name: "Penny Albritoon",
            message:
                "The service and quality exceeded my expectations. Truly a delightful experience!",
            rating: 4.5,
            imageLink:
                "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-1.jpg?v=1721992196&width=512",
        },
        {
            name: "Oscar Nommanee",
            message:
                "Absolutely outstanding! The best experience I've had in a long time.",
            rating: 5,
            imageLink:
                "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-5.jpg?v=1721992196&width=512",
        },
        {
            name: "Emma Watson",
            message:
                "Fantastic quality and wonderful service. I’m incredibly impressed!",
            rating: 4.5,
            imageLink:
                "https://emilly-store1.myshopify.com/cdn/shop/files/bakery-testi-6.jpg?v=1721992197&width=512",
        },
    ];
    
    return (
        <section className="flex justify-center">
            <div className="w-full p-5 lg:max-w-[80%] md:max-w-[85%] flex flex-col gap-3">
                <h1 className="text-center font-semibold text-xl">
                    Why Customers Choose Us
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-6 gap-4">
                    {list?.map((item) => {
                        return (
                            <div className="flex flex-col gap-2 p-4 rounded-lg justify-center items-center border hover:bg-gray-50 transition-all duration-100">
                                <img
                                    src={item?.imageLink}
                                    className="h-32 w-32 rounded-full object-cover"
                                    alt=""
                                />
                                <h1 className="text-sm font-semibold">{item?.name}</h1>
                                <Rating
                                    size="small"
                                    name="customer-rating"
                                    defaultValue={item?.rating}
                                    precision={item?.rating}
                                    readOnly
                                />
                                <p className="text-sm text-gray-500 text-center">
                                    {item?.message}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}