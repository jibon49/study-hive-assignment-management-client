import { useEffect, useState } from "react";





const Faq = () => {

    const [questions, setQuestions] = useState([])

    useEffect(()=>{
        fetch("faq-data.json")
        .then(res=>res.json())
        .then(data=>setQuestions(data))

    },[])

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-10">Frequently Asked Question</h1>
            <div className="flex flex-col-reverse md:flex-row items-center gap-5">
                <div className="w-full md:w-1/2">
                    {
                        questions.map(question=><div key={question.id} className="collapse collapse-plus bg-base-200">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                        {question.question}
                        </div>
                        <div className="collapse-content">
                            <p>{question.answer}</p>
                        </div>
                    </div>)
                    }
                </div>
                <div className="w-full md:w-1/2">
                    <img className="rounded-lg" src="https://i.ibb.co/N75sg9D/5066368.png" />
                </div>
            </div>
        </div>
    );
};

export default Faq;