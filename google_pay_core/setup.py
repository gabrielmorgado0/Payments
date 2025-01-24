from setuptools import setup, find_packages

setup(
    name="google_pay_core",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "typing-extensions>=4.0.0",
        "python-dotenv>=0.19.0",
    ],
    author="Seu Nome",
    author_email="seu.email@exemplo.com",
    description="Framework Python para processamento de pagamentos Google Pay",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/seu-usuario/google-pay-core",
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires=">=3.7",
)
