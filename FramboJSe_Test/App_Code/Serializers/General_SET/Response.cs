using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FramboJSe_Test.App_Code.Serializers.General_SET
{
    /// <summary>
    /// Response for GENERAL (HEADER) service -> SET method.
    /// </summary>
    [System.SerializableAttribute()]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true)]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "", IsNullable = false)]
    public class Response : Base.Response
    {
    }
}