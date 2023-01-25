import { NewsBox } from './NewsBox';

export const News = () => {
    return (
        <section className="news_section layout_padding">
            <div className="container">
                <div className="d-flex flex-column align-items-end">
                    <div className="custom_heading-container">
                        <h2>
                            Letest News
                        </h2>

                    </div>
                    <p>
                        There are many variations of passages of Lorem Ipsum available, but the majority
                    </p>
                </div>
                {/* Nested component News boxes differ only in src for image */}
                {/* Component provides reusability, so NewsBox will be template */}
                <div className="row">
                    <div className="col-md-4">
                        <NewsBox src="images/n-1.jpg" />
                    </div>
                    <div className="col-md-4">
                        <NewsBox src="images/n-2.jpg" />
                    </div>
                    <div className="col-md-4">
                        <NewsBox src="images/n-3.png" />
                    </div>
                </div>
            </div>
        </section>
    );
}